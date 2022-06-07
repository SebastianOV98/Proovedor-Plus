import { Component, OnInit } from '@angular/core';
import { fromDocRef } from '@angular/fire/compat/firestore';
import { NavController, AlertController } from '@ionic/angular';
import { Console } from 'console';
//import { resolve } from 'dns';
import { CrudServiceService } from '../crud-service.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.page.html',
  styleUrls: ['./pruebas.page.scss'],
})
export class PruebasPage implements OnInit{
  url: string;
  data: string;
  usuarios: any;
  user: any
  userName: string;
  userAge: number;
  userAddress: string;

  usuario ={
    email: "",
    password: "",
  }

  listaUsuarios = [];

  
  Mostrar:boolean;
  mostrar = true;


  constructor(public NavCtrl:NavController, private crudservice: CrudServiceService,
    private database: DatabaseService) { }


  altaUsuario(){
    this.database.create('Taladro', this.usuario).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  eliminar(id){
    this.database.delete('Usuarios', id).then (res => {
      alert("Datos eliminados");
    }).catch(err => {
      console.log("Error al elminar");
    });
  }

  modificar(){
    let id = "jX6cHVc7fwwAJ0abC9vO";
    this.database.update('Usuarios', id, this.usuario).then(res =>{
      alert("Datos modificados");
    }).catch(err => {
      console.log("Error al modificar");
    });
  }

  obtenerPorId(id){
    this.database.getById('Usuarios', id).then(res =>{
      res.subscribe(docRef => {
        let usuario = docRef.data();
        usuario['id'] = docRef.id
        console.log(docRef.data())
      })
    })
  }
  
  ngOnInit() {

    this.database.getAll('users').then(firebaseResponse => {
      firebaseResponse.subscribe(listaUsuariosRef => {

        this.listaUsuarios = listaUsuariosRef.map(usuarioRef => {
          let usuario = usuarioRef.payload.doc.data();
          usuario['id'] = usuarioRef.payload.doc.id;
          return usuario;
        })
        console.log(this.listaUsuarios);
      });
    })
  }

  createRecord(){
    let record = {};
    record['name'] = this.userName;
    record['age'] = this.userAge;
    record['address'] = this.userAddress;

    this.crudservice.create_NewUser(record).then(res => {
      this.userName = "";
      this.userAge = undefined;
      this.userAddress = "";
      console.log(res);
    })
    .catch(error => {
      console.log(error)
    });
  }
}
