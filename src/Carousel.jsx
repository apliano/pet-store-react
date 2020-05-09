/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      active: 0,
    };
  }

  static getDerivedStateFromProps({ media }) {
    let photos = ['http://placecorgi.com/600/600'];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return {
      photos,
    };
  }

  // We need to lexical bind the this (The nice way is to use here a arrow function)
  handleClickIndex = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img
              key={photo}
              // Don't bind the this here, as it's going to be re-binded every render and it's quite expensive
              onClick={this.handleClickIndex}
              data-index={index}
              src={photo}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
