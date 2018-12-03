import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import WalletActivityItem from './WalletActivityItem';
import { fetchTransactionsList } from '../../actions/wallet';

moment.suppressDeprecationWarnings = true;

const WalletActivity = (props) => {
  useEffect(() => {
    props.fetchTransactionsList(2, 1);
  }, []);

  const loadMore = () => props.fetchTransactionsList(2, props.wallet.state.list.metadata.page + 1);

  const fixList = (list) => {
    const fixedList = [];
    if (list) {
      list.forEach((i) => {
        const date = moment(i.updatedAt).format('D MMMM');
        if (!fixedList.some(i1 => i1.date === date)) {
          const items = list.filter(i2 => moment(i2.updatedAt).isSame(i.updatedAt, 'day'));
          fixedList.push({ date, items });
        }
      });
    }
    return fixedList;
  };
  const fixedList = fixList(props.wallet.state.list.data);
  return (
    <div className="wallet-activity">
      <div className="wallet-activity__title title">Activity</div>
      {fixedList.map((group, i) => (
        <div key={i} className="wallet-activity__block">
          <div className="wallet-activity__date title_xxsmall"><strong>{group.date}</strong></div>
          <div className="wallet-activity__list">
            {group.items.map((item, i) => <WalletActivityItem key={i} {...item} />)}
          </div>
        </div>
        ))}
      {(props.wallet.state.list.metadata.hasMore) && (
        <div className="wallet-activity__showmore">
          <button
            className="button-clean button-clean_link"
            onClick={loadMore}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default connect(
  state => ({
    wallet: state.wallet,
  }),
  dispatch => bindActionCreators({
    fetchTransactionsList,
  }, dispatch),
)(WalletActivity);
