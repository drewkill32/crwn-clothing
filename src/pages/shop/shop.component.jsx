import React from "react";
import { Route } from "react-router-dom";

import { connect } from "react-redux";

import {
  firestore,
  convertCollectionsSnapshopToMap,
} from "../../firebase/firebase.util";

import "./shop.styles.scss";

import { updateCollections } from "../../redux/shop/shop.actions";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    console.log("did mount");
    collectionRef.onSnapshot(async (snapshot) => {
      const collectionsMap = convertCollectionsSnapshopToMap(snapshot);
      updateCollections(collectionsMap);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispactchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispactchToProps)(ShopPage);
