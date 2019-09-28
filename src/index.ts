import './style/index.scss';
import './style/common.scss';
import './style/patch.scss';
require('./common')
import StageContainer from './StageContainer'
import ComponentBar from './ComponentBar'
import Header from './Header';
import PageConfig from './PageConfig';
import ToolBar from './ToolBar';
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

$(function() {
  // let pageConfig = new PageConfig()
  let stageCt = new StageContainer();
  stageCt.createStage();
  let componentBar = new ComponentBar(stageCt)
  let toolbar = new ToolBar(stageCt)
  let header = new Header(stageCt)
})



