import Presenter from './presenter/presenter.js';
import Model from './model/model.js';

import { mockDestinations} from './mock/destinations.js';
import { mockOffers } from './mock/offers.js';
import { getRandomPoints } from './mock/points.js';

const model = new Model(getRandomPoints(), mockOffers, mockDestinations);
const mainContainer = document.querySelector('.trip-main');

new Presenter(mainContainer, model).init();
