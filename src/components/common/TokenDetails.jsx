import React from 'react';
import { svg2img } from '../../utils/randomAvatar';
import { formatNumber } from '../../utils/funcs';

const TokenDetails = ({ token }) => {

  const change24h = ((token.volume24HrsETH * 1) / (token.tradeVolumeETH * 1) * 100).toFixed(2);

  return (
    <div className="token-details-panel">
      <div className="token-details-header">
        <h3>Token Details</h3>
        <div className="token-details-info">
          <img
            src={token.logo ? `https://assets.thetatoken.org/tokens/${token.logo}` : svg2img(token)}
            className={`token-details-image ${token.logo ? 'has-logo' : ''}`}
            alt={token.symbol}
          />
          <div>
            <div className="token-details-name">{token.name}</div>
            <div className="token-details-symbol">{token.symbol}</div>
          </div>
        </div>
      </div>

      <div className="token-details-row">
        <div className="token-details-label">Price</div>
        <div className="token-details-value">${formatNumber(token.derivedUSD)}</div>
      </div>

      <div className="token-details-row">
        <div className="token-details-label">Market Cap</div>
        <div className="token-details-value">${formatNumber(token.tradeVolumeUSD)}</div>
      </div>

      <div className="token-details-row">
        <div className="token-details-label">Volume</div>
        <div className="token-details-value">${formatNumber(token.tradeVolume)}</div>
      </div>

      <div className="token-details-row">
        <div className="token-details-label">Liquidity</div>
        <div className="token-details-value">${formatNumber(token.totalLiquidityUSD)}</div>
      </div>

      <div className="token-details-row">
        <div className="token-details-label">24h Change</div>
        <div className={`token-details-value ${change24h >= 0 ? 'token-change-positive' : 'token-change-negative'}`}>
          {change24h >= 0 ? '+' : ''}{change24h}%
        </div>
      </div>

      <div className="token-details-row">
        <div className="token-details-label">Contract Address</div>
        <div
          className="token-details-address"
          onClick={() => {
            navigator.clipboard.writeText(token.id);
            alert("Contract address copied to clipboard!");
          }}
        >
          {token.id}
        </div>
      </div>
    </div>
  );
};

export default TokenDetails; 