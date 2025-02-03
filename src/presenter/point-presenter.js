import EventsItemView from '../view/events-item-view.js';
import EventsEditView from '../view/events-edit-view.js';
import {render, replace, remove} from '../framework/render.js';

export default class PointPresenter {
  #eventItem = null;
  #eventEdit = null;
  #event = null;
  #destination = null;
  #offers = null;
  #destinations = null;
  #handleDataChange = null;
  #container = null;
  #onEditClose = null;
  #isEditMode = false;
  #allOffers = null;


  constructor(event, destination, offers, destinations, onDataChange, onEditClose, allOffers) {
    this.#event = event;
    this.#destination = destination;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#onEditClose = onEditClose;
    this.#allOffers = allOffers;
  }

  init(container) {
    this.#container = container;

    this.#eventItem = new EventsItemView(this.#event, this.#destination, this.#offers);
    this.#eventEdit = new EventsEditView(this.#event, this.#destination, this.#offers, this.#destinations, this.#allOffers);

    this.#eventItem.setRollupButtonClickHandler(this.#handleRollupClick);
    this.#eventItem.setFavoriteButtonClickHandler(this.#handleFavoriteClick);

    render(this.#eventItem, this.#container);
    this.#eventEdit._restoreHandlers();
  }

  #setEditModeHandlers = (eventEdit, eventItem) => {
    if (this.#isEditMode) {
      return;
    }

    this.#isEditMode = true;
    this.#onEditClose(this);

    replace(eventEdit, eventItem);

    eventEdit._restoreHandlers();
    eventEdit.setFormSubmitHandler(() => {
      this.closeEdit();
    });

    eventEdit.setRollupButtonClickHandler(() => {
      this.closeEdit();
    });

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.closeEdit();
    }
  };

  #handleRollupClick = () => {
    this.#setEditModeHandlers(this.#eventEdit, this.#eventItem);
  };

  #handleFavoriteClick = () => {
    this.#event.isFavorite = !this.#event.isFavorite;
  };

  closeEdit() {
    if (this.#eventEdit && this.#isEditMode) {
      replace(this.#eventItem, this.#eventEdit);
      remove(this.#eventEdit);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#isEditMode = false;
    } else {
      remove(this.#eventEdit);
    }
  }
}
