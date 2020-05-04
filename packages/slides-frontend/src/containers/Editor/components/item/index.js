// this is a very important file
// it is a generic component
// can be text or image
// and knows its position and size
// it can be focused or put in the background
// it has keyboard listeners for delete
// it can be resized and move
// it is the div inside which we will render the text or image
// it has a ref
// every itemObj from the store has it's own id
// its parent component is an array of them
// i have only one array of elements in the redux but has a type  text/image
// depending on that the obj is different and will be rendered differently
import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import axios from 'axios';

import {
  removeItem,
  changeItemPosition,
  changeItemSize,
  setEditMode,
  editData,
  toggleFocus,
} from '../../../redux-store/DeckReducer/actions';
import {
  getAssetsPath,
  getUsername,
  getTitle,
} from '../../../redux-store/PresentationReducer/selectors';
import { getCurrentSlide } from '../../../redux-store/DeckReducer/selectors';
import Text from '../text';
import Image from '../image';
import './index.css';

function Item({
  itemObj,
  onRemoveItem,
  onChangePosition,
  onChangeSize,
  assetsPath,
  onSetEditMode,
  currentSlide,
  onEditData,
  title,
  username,
  onToggleFocus,
}) {
  const itemRef = useRef(null);

  const { type, ID, Focused } = itemObj;
  const ItemComponent = type === 'TEXT' ? Text : Image;

  const delImageReq = () => {
    const url = `${assetsPath}/image/${username}/${title}/${itemObj.Src}`;
    // console.log('url in deleter is ', url);
    return axios.delete(url);
  };

  const deleter = e => {
    e.preventDefault(); // super IMPORTANT here otherwise it propagates the event
    console.log('deleter called', ID);
    // send a delete in Redux
    if (type === 'TEXT' && itemObj.Edit) {
      // text in edit mode so don't delete it
      return;
    }
    onRemoveItem(ID);
    // send a delete in Server if it is an Image
    if (type === 'IMAGE') {
      delImageReq()
        .then(res => {
          if (res.status === 200) {
            // console.log('deleted successfully');
            // notify with success
            // addToast(`Deleted successfully!`, {
            //   appearance: 'success',
            //   autoDismiss: true,
            // });
          }
        })
        .catch(err => {
          // addToast('Deletion Failed...', {
          //   appearance: 'error',
          //   autoDismiss: true,
          // });
          console.log('Error is', err);
        });
    }
  };

  const singleClick = e => {
    if (itemRef.current.contains(e.target)) {
      // inside click
      itemRef.current.focus();
      onToggleFocus(ID, true);
      return;
    }
    if (type === 'TEXT' && itemObj.Edit) {
      // if text is still editing then ignore the outside click
      return;
    }
    itemRef.current.blur();
    onToggleFocus(ID, false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', singleClick);
    return () => {
      document.removeEventListener('mousedown', singleClick);
    };
  });

  return (
    <div ref={itemRef} className="item-style">
      <KeyboardEventHandler
        handleKeys={['backspace', 'del']}
        onKeyEvent={(key, e) => Focused && deleter(e)}
      />
      <ItemComponent ID={ID} />
    </div>
  );
}

Item.propTypes = {
  itemObj: PropTypes.object,
  assetsPath: PropTypes.string,
  onRemoveItem: PropTypes.func,
  onChangePosition: PropTypes.func,
  onChangeSize: PropTypes.func,
  onSetEditMode: PropTypes.func,
  currentSlide: PropTypes.number,
  onEditData: PropTypes.func,
  username: PropTypes.string,
  title: PropTypes.string,
  onToggleFocus: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangePosition: (id, position) =>
      dispatch(changeItemPosition(id, position)),
    onChangeSize: (id, position) => dispatch(changeItemSize(id, position)),
    onRemoveItem: id => dispatch(removeItem(id)),
    onSetEditMode: (id, edit) => dispatch(setEditMode(id, edit)),
    onEditData: (id, data) => dispatch(editData(id, data)),
    onToggleFocus: (id, focus) => dispatch(toggleFocus(id, focus)),
  };
}

export default connect(
  state => ({
    assetsPath: getAssetsPath(state),
    currentSlide: getCurrentSlide(state),
    username: getUsername(state),
    title: getTitle(state),
  }),
  mapDispatchToProps,
)(Item);