import React from "react";
import {Router, Route, Switch} from "dva/router";

import WrappedFormEdit from './Components/edit';
import RegistrationPostForm from './Components/posts/form';
import homePosts from "./routes/homePosts";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={homePosts} />
          <Route exact path="/posts" component={homePosts} />
          <Route exact path="/edit"  component={WrappedFormEdit}/>
          <Route exact path="/createTest"  component={RegistrationPostForm}/>
        </Switch>
      </div>
    </Router>
  );
}

export default RouterConfig;
