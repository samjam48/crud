
var del = document.getElementById('delete');

del.addEventListener('click', function () {
  alert("this deletes a file. oh well");
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Darth Vader'
    })
  }).then(function (response) {
    window.location.reload()
  })
})


// var yoda = document.getElementById('yoda');

// yoda.addEventListener('click', function () {
//   fetch('quotes', {
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       'name': 'Yoda'
//     })
//   }).then(function (response) {
//     window.location.reload()
//   })
// })


/* globals fetch */
// var update = document.getElementById('update');
// var name = document.getElementById('name').value;
// var quote = document.getElementById('quote').value;




// update.addEventListener('click', function () {
//   console.log(name);
//   console.log(value);
//   fetch('quotes', {
//     method: 'put',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       'name': name,
//       'quote': quote
//     })
//   })
//   .then(response => {
//     if (response.ok) return response.json()
//   })
//   .then(data => {
//     console.log(data)
//   })
// })

// app.post('/savechanges/:id', (req, res) => {   // post persons UPDATED details to db
//     console.log('trying to save person to db')
//     var id = require('mongodb').ObjectID(req.params.id);
//     db.collection('persons').findOneAndUpdate({_id: id }, {
//       $set: {
//         fullName: req.body.fullName,
//         email: req.body.email,
//         address: req.body.address
//       }
//     }, {
//       sort: {_id: -1},
//       upsert: true
//     }, (err, result) => {
//       if (err) return res.send(err);
//       db.collection('persons').find().toArray((err, result) => {  // get our cursor form db and turn into a nice array of objects
//         if (err) return res.send(err)
//         res.redirect('/');
//       })
//     })
// });