import './style/index.scss';
import './style/common.scss';
import './style/patch.scss';
require('./common')
import StageContainer from './StageContainer'
import ComponentList from './ComponentList'
import Header from './Header';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

$(function() {
  let stageCt = new StageContainer();
  stageCt.createStage();
  let componentList = new ComponentList(stageCt)
  let header = new Header()
})



