import {Component, h, ComponentInterface, Prop} from '@stencil/core';
import {RouterHistory} from '@stencil/router';

import {defaultPageMetaDescription} from '../../global/site-structure-utils';
import {registerViewWithTracking} from '../../global/services/helper.utils';

@Component({
  tag: 'app-contact-us',
  styleUrl: 'app-contact-us.css',
  shadow: true
})
export class AppContactUs implements ComponentInterface {
  private pageMetaDescription = defaultPageMetaDescription;

  @Prop() history: RouterHistory;

  constructor() {
    document.title = `Contact New You Medispa`;
    document.querySelector('meta[name="description"]').setAttribute("content", this.pageMetaDescription);   
  }

  componentDidLoad() {
    registerViewWithTracking(this.history.location.pathname);
  }

  render() {
    return (
      <div>
        <div class="location">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2287.852942479825!2d-1.4460263000000002!3d55.010742799999996!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e6ef1ca10e32b%3A0x8c4b5096ea3a3f7c!2s17+Northumberland+Square%2C+North+Shields%2C+Tyne+and+Wear+NE30+1PX!5e0!3m2!1sen!2suk!4v1416777768507" 
            width="100%" 
            height="300" 
            frameborder="0" 
            title="Location of New You Medispa"></iframe>
        </div>

        <div class="contact-information">
          <h1>Contact us</h1>
          
          <p>New You Medispa</p>

          <p>Email: reception@newyou-medispa.co.uk</p>

          <p>
            Address:<br />
            17 Northumberland Square,<br />
            North Shields,<br />
            Tyne and Wear,<br />
            NE30 1PX
          </p>

          <p>Telephone: 0191 257 3141</p>

          <opening-hours smallTitle></opening-hours>
        </div>
      </div>
    );
  }
}
