import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Devedores } from '../imports/api/devedores/devedores';

new Tabular.Table({
  name: "TableList",
  collection: Devedores,
  columns: [
    {data: "nome", title: "Nome"},
    {data: "pizzas", title: "Pizzas"},
  ]
});



