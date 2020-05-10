import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionsFetching } from "../../redux/shop/shop.selectors";

import WithSpinner from "../with-spinner/with-spinner.component";

import CollectionsOverview from "./collections-overview.component";

const mapStateToPorps = createStructuredSelector({
  isLoading: selectIsCollectionsFetching,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToPorps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
