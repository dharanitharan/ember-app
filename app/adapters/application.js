import DS from 'ember-data';
import config from 'ember-app/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: config.apiHost,
});
