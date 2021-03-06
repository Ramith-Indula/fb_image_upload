import { Component, ViewChild } from '@angular/core';
import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams, FBVideoComponent } from 'ngx-facebook';
import {Http} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    '.container { max-width: 700px; background: #f7f7f7; margin: 50px auto; padding: 30px; border-radius: 15px; }',
    'h2 { margin-bottom: 20px; }',
    'h4 { margin-top: 40px; margin-bottom: 10px; }'
  ]
})
export class AppComponent {

  accessToken:any;

  @ViewChild(FBVideoComponent) video: FBVideoComponent;

  constructor(private fb: FacebookService,
              private http: Http) {

    console.log('Initializing Facebook');

    fb.init({
      appId: '165288270864212',
      version: 'v2.11'
    });

  }

  /**
   * Login with minimal permissions. This allows you to see their public profile only.
   */
  login() {
    this.fb.login()
      .then((res: LoginResponse) => {
       this.accessToken = res.authResponse.accessToken;
      })
      .catch(this.handleError);
  }

  /**
   * Login with additional permissions/options
   */
  loginWithOptions() {

    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'user_friends, email, publish_actions, manage_pages, pages_show_list, publish_pages, public_profile'
    };

    this.fb.login(loginOptions)
      .then((res: LoginResponse) => {
        console.log('Logged in', res);
      })
      .catch(this.handleError);

  }

  getLoginStatus() {
    this.fb.getLoginStatus()
      .then(console.log.bind(console))
      .catch(console.error.bind(console));


  }


  /**
   * Get the user's profile
   */
  getProfile() {
    this.fb.api('/me')
      .then((res: any) => {
        console.log('Got the users profile', res);
      })
      .catch(this.handleError);
  }


  /**
   * Get the users friends
   */
  getFriends() {
    this.fb.api('/me/friends')
      .then((res: any) => {
        console.log('Got the users friends', res);
      })
      .catch(this.handleError);
  }


  /**
   * Show the share dialog
   */
  share() {

    const options: UIParams = {
      method: 'share',
      href: 'https://github.com/zyramedia/ng2-facebook-sdk'
    };

    this.fb.ui(options)
      .then((res: UIResponse) => {
        console.log('Got the users profile', res);
      })
      .catch(this.handleError);

  }


  playVideo() {
    this.video.play();
  }

  onVideoEvent(ev) {
    console.log('Video event fired: ' + ev);
  }

  pauseVideo() {
    this.video.pause();
  }


  /**
   * This is a convenience method for the sake of this example project.
   * Do not use this in production, it's better to handle errors separately.
   * @param error
   */
  private handleError(error) {
    console.error('Error processing action', error);
  }

  UploadImage() {
    let params = {
      url: 'https://pbs.twimg.com/media/DNbMnnBX4AE5QIE.jpg',
      published: true,
      caption: '@Pasiya Oya wal urek! ow dan oya wal urek... :D',
      access_token: this.accessToken
    };

    this.fb.api('/543337362691526/photos', 'post', params).then().catch(this.handleError);
  }
}
