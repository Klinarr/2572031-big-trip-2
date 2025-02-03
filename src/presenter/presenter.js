import MainInfoView from '../view/main-info-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/events-list-view.js';
import {render} from '../framework/render.js';
import PointPresenter from '../presenter/point-presenter.js';
import { sortPoints } from '../utils.js';
export default class Presenter {
  sortContainer = null;
  eventsContainer = new EventsListView();
  #currentEdit = null;
  #currentSortType = 'day';
  #points = [];
  #model = null;

  constructor(container, model) {
    this.container = container;
    this.model = model;
    this.sortContainer = document.querySelector('.trip-events');
    this.#points = this.model.getPoints();
  }

  init() {
    this.renderMainInfo();
    this.renderFilters();
    this.renderSort();
    this.renderEventsList();
    this.renderEventsItems();
  }

  renderMainInfo() {
    const point = this.model.getPoints()[0];
    const destination = this.model.getDestinationById(point.destination);

    render(new MainInfoView(point, destination), this.container);
  }

  renderFilters() {
    render(new FiltersView(), this.container);
  }

  renderSort() {
    const sortView = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(sortView, this.sortContainer);
  }

  renderEventsList() {
    render(this.eventsContainer, this.sortContainer, 'beforeend');
  }

  renderEventsItems() {
    if (this.#currentEdit) {
      this.#currentEdit.closeEdit();
      this.#currentEdit = null; // Сбрасываем текущий открытый PointPresenter
    }

    const sortedPoints = sortPoints(this.#points, this.#currentSortType);
    this.eventsContainer.element.innerHTML = '';

    sortedPoints.forEach((point) => {
      const destination = this.model.getDestinationById(point.destination);
      const offers = this.model.getOffersById(point.type, point.offers);
      const allOffers = this.model.getOffers();
      const pointPresenter = new PointPresenter(
        point,
        destination,
        offers,
        this.model.getDestinations(),
        this.#handleDataChange,
        this.#handleEditOpen,
        allOffers,
      );
      pointPresenter.init(this.eventsContainer.element);
    });
  }

  #handleDataChange = (updatedEvent) => {
    this.model.updatePoint(updatedEvent);
  };

  #handleEditOpen = (pointPresenter) => {
    if (this.#currentEdit && this.#currentEdit !== pointPresenter) {
      this.#currentEdit.closeEdit();
    }
    this.#currentEdit = pointPresenter;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.renderEventsItems();
  };
}
