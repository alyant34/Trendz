import React from 'react';

class ExpandedViewModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      zoomMode: false
    };
    this.handleClickOnThumbnail = this.handleClickOnThumbnail.bind(this);
    this.toggleZoom = this.toggleZoom.bind(this);
    this.imageZoom = this.imageZoom.bind(this);
    this.moveLens = this.moveLens.bind(this);
    this.getCursorPos = this.getCursorPos.bind(this);
  }

  handleClickOnThumbnail(index) {
    this.props.clickOnThumbnailHandler(index);
  }

  componentDidUpdate() {
    this.imageZoom();
  }

  toggleZoom() {
    var toggledValue = !this.state.zoomMode;
    this.setState({
      zoomMode: toggledValue
    });
  }

  imageZoom() {

    if (this.state.zoomMode) {
      var img = document.getElementById('expanded-view-non-zoomed-image');
      var result = document.getElementById('expanded-view-zoomed-image');
      var lens = document.getElementById('lens');

      var cx = result.offsetWidth / lens.offsetWidth; // 420/70
      var cy = result.offsetHeight / lens.offsetHeight; // 630/70

      result.style.backgroundImage = "url('" + img.src + "')";
      console.log('img width: ', img.width);
      console.log('img height: ', img.height);

      result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

      lens.addEventListener("mousemove", this.moveLens.bind(this, cx, cy));
      result.addEventListener("mousemove", this.moveLens.bind(this, cx, cy));

    } else {
      return;
    }

  }

  moveLens (cx, cy, e) {

    if (this.state.zoomMode) {
      var img = document.getElementById('expanded-view-non-zoomed-image');
      var result = document.getElementById('expanded-view-zoomed-image');
      var lens = document.getElementById('lens');

      e.preventDefault();

      /* Get the cursor's x and y positions: */
      var pos = this.getCursorPos(e);

      /* Calculate the position of the lens: */
      var x = pos.x - (lens.offsetWidth / 2);
      var y = pos.y - (lens.offsetHeight / 2);

      /* Prevent the lens from being positioned outside the image: */
      if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
      if (x < 0) {x = 0;}
      if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
      if (y < 0) {y = 0;}

      /* Display what the lens "sees": */
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";

    } else {
      return;
    }
  }

  getCursorPos (e) {
    var a, x = 0, y = 0;
    var img = document.getElementById('expanded-view-non-zoomed-image');

    e = e || window.event;

    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();

    x = e.pageX - a.left;
    y = e.pageY - a.top;

    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }

  render() {
    if (!this.props.productStyles.results) {
      return <div></div>;
    }

    return (
      <div className="expanded-view-overlay">
        <div className="expanded-view-modal">
          <button type="button" className="expanded-view-modal-button" onClick={this.props.toggleModal}>Close</button>
          <div className="expanded-view-thumbnails">
            {!this.props.firstThumbnailVisible && !this.state.zoomMode && <i className="expanded-view-up-is-visible expanded-view-arrow-thumbnail" onClick={this.props.previousThumbnailClickHandler} ></i>}
            {this.props.productStyles.results[this.props.styleIndex].photos.map((urlObj, index, array) => {
              if (index >= this.props.firstThumbnailIndex && index <= this.props.lastThumbnailIndex && index !== this.props.mainImageThumbnailIndex && !this.state.zoomMode) {
                return <i className="expanded-view-thumbnail far fa-images" onClick={this.handleClickOnThumbnail.bind(this, index)} key={index}></i>;
              } else if (index >= this.props.firstThumbnailIndex && index <= this.props.lastThumbnailIndex && index === this.props.mainImageThumbnailIndex && !this.state.zoomMode) {
                return <i className="expanded-view-thumbnail far fa-images expanded-view-selected" onClick={this.handleClickOnThumbnail.bind(this, index)} key={index}></i>;
              } else if (index > this.props.lastThumbnailIndex && index === array.length - 1 && !this.state.zoomMode) {
                return <i className="expanded-view-down-is-visible expanded-view-arrow-thumbnail" onClick={this.props.nextThumbnailClickHandler} key={index}></i>;
              }
            })}
          </div>
          {this.props.mainImageThumbnailIndex !== 0 && <i className="main-image-arrows left expanded-main-arrow-left" onClick={this.props.previousMainClickHandler}></i>}
          <div className="expanded-view-main-image-container">
            {this.state.zoomMode && <div className="img-zoom-lens" id="lens"></div>}
            <img src={this.props.productStyles.results[this.props.styleIndex].photos[this.props.mainImageThumbnailIndex].url} className="expanded-view-main-image" id="expanded-view-non-zoomed-image" onClick={this.toggleZoom}></img>
            {this.state.zoomMode && <div className="img-zoom-result" id="expanded-view-zoomed-image" onClick={this.toggleZoom}></div>}
          </div>
          {this.props.numberOfThumbnails !== (this.props.mainImageThumbnailIndex + 1) && <i className="main-image-arrows right expanded-main-arrow-right" onClick={this.props.nextMainClickHandler}></i>}
        </div>
      </div>);
  }

}

export default ExpandedViewModal;