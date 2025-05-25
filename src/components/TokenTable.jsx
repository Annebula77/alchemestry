import React, { useEffect, useState } from "react";
import TokenRow from "./common/TokenRow";
import { svg2img } from "../utils/randomAvatar";
import { formatNumber } from "../utils/funcs";
import "./style.css";

const TokenTable = ({ tokenData }) => {
  const [sortedData, setSortedData] = useState([...tokenData]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedToken, setSelectedToken] = useState(null);

  const sortData = (key) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    const sorted = [...tokenData].sort((a, b) => {
      if (a[key] * 1 < b[key] * 1) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] * 1 > b[key] * 1) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    setSortedData([...sorted]);
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (columnName) => {
    if (sortConfig && sortConfig.key === columnName) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return null;
  };

  const handleTokenSelect = (token) => {
    setSelectedToken(token);
  };

  const tableStyle = {
    backgroundColor: "#191919",
    overflowY: "auto",
    maxHeight: "90vh",
    width: "100%",
    cursor: "pointer",
  };

  useEffect(() => {
    setSortedData(tokenData);
  }, [tokenData]);

  const change24h = selectedToken
    ? ((selectedToken.volume24HrsETH * 1) / (selectedToken.tradeVolumeETH * 1) * 100).toFixed(2)
    : 0;

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div className="table-container font-header" style={{ ...tableStyle, flex: "7" }}>
        <table
          className="custom-table"
          style={{
            width: "100%",
            marginTop: "15px",
            marginBottom: "20px",
            fontSize: "medium",
          }}
        >
          <thead className="font-header">
            <tr>
              <th onClick={() => sortData("symbol")} style={{ textAlign: "start" }}>
                TOKEN {renderSortIcon("symbol")}
              </th>
              <th onClick={() => sortData("derivedUSD")} style={{ textAlign: "start" }}>
                PRICE {renderSortIcon("derivedUSD")}
              </th>
              <th onClick={() => sortData("tradeVolumeUSD")} style={{ textAlign: "start" }}>
                MARKETCAP {renderSortIcon("tradeVolumeUSD")}
              </th>
              <th onClick={() => sortData("totalLiquidityUSD")} style={{ textAlign: "start" }}>
                LIQUIDITY {renderSortIcon("totalLiquidityUSD")}
              </th>
              <th onClick={() => sortData("tradeVolume")} style={{ textAlign: "start" }}>
                VOLUME {renderSortIcon("tradeVolume")}
              </th>
              <th style={{ textAlign: "start", paddingRight: "80px" }}>
                TOKEN AGE
              </th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "black" }}>
            {[...sortedData].map((rowData, index) => (
              <TokenRow
                data={rowData}
                key={index}
                onTokenSelect={handleTokenSelect}
              />
            ))}
          </tbody>
        </table>
      </div>

      {selectedToken && (
        <div className="token-details-panel" style={{
          flex: "3",
          backgroundColor: "#191919",
          padding: "20px",
          marginLeft: "20px",
          borderRadius: "8px",
          border: "1px solid #00a3cc"
        }}>
          <div className="token-details-header">
            <h3 style={{ color: "white", marginBottom: "20px" }}>Token Details</h3>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={
                  selectedToken.logo
                    ? `https://assets.thetatoken.org/tokens/${selectedToken.logo}`
                    : svg2img(selectedToken)
                }
                style={{
                  width: "30px",
                  marginRight: "10px",
                  borderRadius: selectedToken.logo ? "0" : "50%"
                }}
                alt={selectedToken.symbol}
              />
              <div>
                <div style={{ fontSize: "18px", fontWeight: "bold", color: "white" }}>{selectedToken.name}</div>
                <div style={{ color: "#888" }}>{selectedToken.symbol}</div>
              </div>
            </div>
          </div>

          <div className="token-details-row">
            <div className="token-details-label">Price</div>
            <div className="token-details-value">${formatNumber(selectedToken.derivedUSD)}</div>
          </div>

          <div className="token-details-row">
            <div className="token-details-label">Market Cap</div>
            <div className="token-details-value">${formatNumber(selectedToken.tradeVolumeUSD)}</div>
          </div>

          <div className="token-details-row">
            <div className="token-details-label">24h Volume</div>
            <div className="token-details-value">${formatNumber(selectedToken.tradeVolume)}</div>
          </div>

          <div className="token-details-row">
            <div className="token-details-label">Liquidity</div>
            <div className="token-details-value">${formatNumber(selectedToken.totalLiquidityUSD)}</div>
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
                navigator.clipboard.writeText(selectedToken.id);
                alert("Contract address copied to clipboard!");
              }}
            >
              {selectedToken.id}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenTable;
