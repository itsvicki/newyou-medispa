import {Component, Host, Prop, h, ComponentInterface} from '@stencil/core';
import {MatchResults, RouterHistory} from '@stencil/router';

import {TreatmentService} from '../../global/services/treatment.service';
import {toHypertext, registerViewWithTracking} from '../../global/services/helper.utils';

import {TreatmentInterface, ErrorInterface} from '../../global/definitions/definitions';
import {fileNotFound} from '../../global/site-structure-utils';

@Component({
  tag: 'app-treatment',
  styleUrl: 'app-treatment.css',
  shadow: true
})
export class AppTreatment implements ComponentInterface {
  private fileNotFound = fileNotFound;
  private treatment: TreatmentInterface = {} as TreatmentInterface;
  private error: ErrorInterface = {} as ErrorInterface;

  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  async componentWillRender() {
    const page = `/treatment/${this.match.params.page}`;
    
    try {
      const treatment = await TreatmentService.getTreatment(page);  

      this.treatment = treatment;

      // Update browser title & description
      document.title = `${treatment.name} - New You Medispa`;
      document.querySelector('meta[name="description"]').setAttribute("content", treatment.browserDescription); 
    }
    catch(err) {
      if (err.code === 'NO_MATCH') {
        this.fileNotFound();
      }

      this.error = err;
    }
  }

  componentDidLoad() {
    registerViewWithTracking(this.history.location.pathname);
  }

  render() {
    const {errorMessage} = this.error;
    const {name, url, hypertext} = this.treatment;

    return (
      <Host>
        {errorMessage 
          ? <p>{errorMessage}</p>
          : <div>
              <nav>
                <ul>
                  <li>
                    <stencil-route-link url='/treatments'>treatments &gt;&nbsp;</stencil-route-link>
                  </li>
                  <li>
                  <stencil-route-link url={url}>{name}</stencil-route-link>
                  </li>
                </ul>
              </nav>

              <h1>{name}</h1>
              {toHypertext(hypertext)}
          </div>
        }
      </Host>
    );
  }
}
