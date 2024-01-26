import {renderGallery} from './gallery.js';
import {initializeFilters} from './filters.js';
import {showAlert} from './dialogs.js';
import {loadData, getPhotoList} from './data.js';
import './img-upload.js';

const init = async () => {
  try {
    await loadData();
    initializeFilters();
    renderGallery(getPhotoList());
  } catch (err) {
    showAlert(err.message);
  }
};

init();
