import React from 'react';
import { svg2img } from '../../utils/randomAvatar';
import { formatNumber } from '../../utils/funcs';

const TokenDetails = ({ token }) => {
  const change24h = ((token.volume24HrsETH * 1) / (token.tradeVolumeETH * 1) * 100).toFixed(2);

  const copyToClipboard = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        alert("Contract address copied to clipboard!");
      } catch (err) {
        console.error('Failed to copy text: ', err);
        fallbackCopyToClipboard(text);
      }
    } else {
      fallbackCopyToClipboard(text);
    }
  };

  const fallbackCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        alert("Contract address copied to clipboard!");
      } else {
        alert("Failed to copy contract address. Please copy it manually.");
      }
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
      alert("Failed to copy contract address. Please copy it manually.");
    }
    document.body.removeChild(textArea);
  };

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
          onClick={() => copyToClipboard(token.id)}
        >
          {token.id}
        </div>
      </div>
    </div>
  );
};

export default TokenDetails; 