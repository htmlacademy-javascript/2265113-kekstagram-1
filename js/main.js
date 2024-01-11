import {renderGallery} from './gallery.js';
import {createUsersPhotoList} from './data.js';
import './img-upload.js';

const photoList = createUsersPhotoList(25);

renderGallery(photoList);
