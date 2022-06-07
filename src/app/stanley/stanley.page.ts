import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
 
@Component({
  selector: 'app-stanley',
  templateUrl: './stanley.page.html',
  styleUrls: ['./stanley.page.scss'],
})
export class StanleyPage implements OnInit {

  listaStanley = [];

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private database: DatabaseService
  ) { }

  ngOnInit() {
    this.database.getAll('Stanley').then((firebaseResponse) => {
      firebaseResponse.subscribe((listamartilloRef) => {
        this.listaStanley = listamartilloRef.map((martilloRef) => {
          let martillo = martilloRef.payload.doc.data();
          martillo['id'] = martilloRef.payload.doc.id;
          return martillo;
        });
      });
    });
  }
  
  atras() {
    this.router.navigate(['marcas']);
  }

}

