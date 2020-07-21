import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import StandardSlide from '../../../theming/StandardSlide';
import {getTheme, getAssetsPath, getTitle} from '../../redux-store/PresentationReducer/selectors';
import {getDeck} from '../../redux-store/DeckReducer/selectors';
import RenderHtml from '../components/text/RenderHtml';
import './index.css';

const Core = ({ x, y, width, height, item, assetsPath, username, title }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      boxSizing: 'border-box',
      display: 'inline-block',
    }}
  >
    {item.type === 'TEXT' ? (
      // the item is text so use the renderHTML 
      <RenderHtml text={item.Data} />
    ): (
      // if it is an image
      <div className="img-style">
        <img src={`${assetsPath}/static/${username}/${title}/assets/${item.Src}`} alt="" />
      </div>
    )}
  </div>
)



function MyExportedSlides({theme, DeckOfSlides, assetsPath, username, title}) {
  const StandardSlideTemplate = StandardSlide(theme);
    return (
      <>
        {DeckOfSlides.map(slide => (
          <>
            <StandardSlideTemplate key={slide.ID}>
              {slide.itemsArray.map(itm =>
                <Core
                  key={itm.ID}
                  x={itm.Position.x}
                  y={itm.Position.y}
                  width={itm.Size.width}
                  height={itm.Size.height}
                  item={itm}
                  assetsPath={assetsPath}
                  username={username}
                  title={title}
                />
              )}
            </StandardSlideTemplate>
          </>
        ))}
      </>
    );
}

MyExportedSlides.propTypes = {
  theme: PropTypes.string.isRequired,
  DeckOfSlides: PropTypes.array,
  assetsPath: PropTypes.string,
  username: PropTypes.string,
  title: PropTypes.string,
};

export default connect(
  state => ({
    theme: getTheme(state),
    DeckOfSlides: getDeck(state),
    assetsPath: getAssetsPath(state),
    username: state.keycloak.userToken.cern_upn,
    title: getTitle(state),
  }),
  null,
)(MyExportedSlides);
