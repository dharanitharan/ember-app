import Ember from 'ember';

export default Ember.Route.extend({
  resetController(controller) {
    controller.setProperties({
      newTitle: '',
      songCreationStarted: false
    });
  },

  title() {
    let bandName = this.modelFor('bands.band').get('name');
    return `${bandName} songs - Ember`;
  },

  actions: {
    createSong() {
      let controller = this.get('controller'),
        band = controller.get('model');

      let song = this.store.createRecord('song', {
        title: controller.get('newTitle'),
        band: band
      });
      return song.save().then(function () {
        controller.set('newTitle', '');
      });
    },

    setRating(params) {
      let { item: song, rating } = params;

      if (song.get('rating') === rating) {
        rating = null;
      }
      song.set('rating', rating);
      return song.save();
    }
  }
});

