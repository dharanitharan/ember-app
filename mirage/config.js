export default function () {
  this.get('/bands');
  this.post('/bands');
  this.get('/bands/:id');
  this.get('/bands/:id/songs', function (schema, request) {
    let band = schema.bands.find(request.params.id);
    return band.songs;
  });

  this.post('/songs');
  this.get('/songs/:id');
  this.put('/songs/:id');
  this.patch('/songs/:id');
  this.delete('/songs/:id');
}
