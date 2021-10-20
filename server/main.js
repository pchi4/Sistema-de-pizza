import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Task } from '../imports/api/task/task'
import { Devedores} from '../imports/api/devedores/devedores'

Meteor.startup(() => {

  Meteor.publish('teste', function () {
    return Task.find({});
   });

   Meteor.publish('devedores', function(){
     return Devedores.find({})
   } )
});

