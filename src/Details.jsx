import React from 'react';
import { navigate } from '@reach/router';
import pet from '@frontendmasters/pet';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';
import Modal from './Modal';

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      showModal: false,
    };
  }

  componentDidMount() {
    pet
      .animal(this.props.id)
      .then(
        ({
          animal: {
            name,
            type: animal,
            contact,
            description,
            photos,
            breeds: { primary },
            url,
          },
        }) => {
          this.setState({
            name,
            animal,
            location: `${contact.address.city}, ${contact.address.state}`,
            description: description,
            media: photos,
            breed: primary,
            loading: false,
            url,
          });
        },
        console.error
      );
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  adopt = () => {
    navigate(this.state.url);
  };

  handleClick() {}

  render() {
    const { loading, showModal } = this.state;
    if (loading) {
      return <h1>Loading ...</h1>;
    } else {
      const { animal, breed, location, description, name, media } = this.state;
      return (
        <div className="details">
          <Carousel media={media} />
          <div>
            <h1>{name}</h1>
            <h2>{`${animal} - ${breed} - ${location}`}</h2>
            <ThemeContext.Consumer>
              {([theme]) => (
                <button
                  style={{ backgroundColor: theme }}
                  onClick={this.toggleModal}
                >
                  Adopt {name}
                </button>
              )}
            </ThemeContext.Consumer>
            <p>{description}</p>
            {showModal && (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name}?</h1>
                  <div className="buttons">
                    <button onClick={this.adopt}>Yes</button>
                    <button onClick={this.toggleModal}>No</button>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      );
    }
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
