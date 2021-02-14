import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth,
  ) {

  }


  ngOnInit() {

  }

  startAuth() {
    const googleProvider = new auth.GoogleAuthProvider();
    const emailProvider = new auth.EmailAuthProvider();
    from(this.fireAuth.auth.signInWithPopup(googleProvider)).subscribe(
      authResult => console.log(authResult)
    );
  }
}
