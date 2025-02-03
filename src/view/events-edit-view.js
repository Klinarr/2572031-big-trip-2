import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { dateModule } from '../utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createEventsEditTemplate(state, destination, allOffers , allDestinations) {
  const dateFrom = new Date(state.dateFrom);
  const dateTo = new Date(state.dateTo);
  const currentOffers = allOffers.find((offer) => offer.type === state.type)?.offers || [];
  return(
    ` 
        <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${state.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                    ${state.type}
                    </label>
                    <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                        ${allDestinations.map((city) => `<option value="${city.name}"></option>`).join(' ')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateModule.formatDateTime(dateFrom)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateModule.formatDateTime(dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                      <div class="event__available-offers">
                      ${currentOffers.map((offer) => `
                        <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-${state.type}">
                        <label class="event__offer-label" for="event-offer-${state.type}-1">
                          <span class="event__offer-title">${offer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label>
                        </div>
                        `).join(' ')}
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join(' ')}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>
    `
  );
}

export default class EventsEditView extends AbstractStatefulView {
  #destination = null;
  #offers = null;
  #allDestinations = null;
  #allOffers = null;

  constructor(point, destination, offers, allDestinations, allOffers) {
    super();
    this.#destination = destination;
    this.#offers = offers;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers || [];

    this._setState({
      ...point,
      destination: this.#destination.id,
      offers: point.offers || [],
    });

    this._callback = {
      formSubmit: null,
      rollupClick: null,
    };

    this._restoreHandlers();
  }

  get template() {
    const currentDestination = this.#allDestinations.find((dest) => dest.id === this._state.destination) || { name: '', description: '', pictures: [] };

    return createEventsEditTemplate(this._state, currentDestination, this.#allOffers, this.#allDestinations);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.element.querySelector('.event--edit').addEventListener('submit', callback);
  }

  setRollupButtonClickHandler(callback) {
    this._callback.rollupClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', callback);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setRollupButtonClickHandler(this._callback.rollupClick);

    flatpickr(this.element.querySelector('#event-start-time-1'), {
      enableTime: true, // Включаем выбор времени
      dateFormat: 'd/m/Y H:i', // Формат даты и времени (пример: 31/12/2023 14:30)
      defaultDate: this._state.dateFrom, // Устанавливаем начальную дату
      onChange: (selectedDates) => {
        this.updateElement({
          dateFrom: selectedDates[0].toISOString(), // Обновляем состояние
        });
      },
    });

    flatpickr(this.element.querySelector('#event-end-time-1'), {
      enableTime: true, // Включаем выбор времени
      dateFormat: 'd/m/Y H:i', // Формат даты и времени (пример: 31/12/2023 14:30)
      defaultDate: this._state.dateTo, // Устанавливаем начальную дату
      onChange: (selectedDates) => {
        this.updateElement({
          dateTo: selectedDates[0].toISOString(), // Обновляем состояние
        });
      },
    });
  }

  #typeChangeHandler = (evt) => {
    const selectedType = evt.target.value;
    const selectedOffers = this.#allOffers.find((offer) => offer.type === selectedType)?.offers || [];

    this.updateElement({
      type: selectedType,
      allOffers: selectedOffers.map((offer) => offer.id),
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestinationName = evt.target.value;
    const selectedDestination = this.#allDestinations.find((dest) => dest.name === selectedDestinationName);
    if (selectedDestination) {

      this.updateElement({
        destination: selectedDestination.id,
      });
    }
  };
}
