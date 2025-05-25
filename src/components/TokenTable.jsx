import React, { useEffect, useState } from "react";
import TokenRow from "./common/TokenRow";
import TokenDetails from "./common/TokenDetails";
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

  useEffect(() => {
    setSortedData(tokenData);
  }, [tokenData]);

  return (
    <div className="tokens-container">
      <div className="table-container token-table-container font-header">
        <table className="custom-table token-table">
          <thead className="font-header">
            <tr>
              <th onClick={() => sortData("symbol")}>
                TOKEN {renderSortIcon("symbol")}
              </th>
              <th onClick={() => sortData("derivedUSD")}>
                PRICE {renderSortIcon("derivedUSD")}
              </th>
              <th onClick={() => sortData("tradeVolumeUSD")}>
                MARKETCAP {renderSortIcon("tradeVolumeUSD")}
              </th>
              <th onClick={() => sortData("totalLiquidityUSD")}>
                LIQUIDITY {renderSortIcon("totalLiquidityUSD")}
              </th>
              <th onClick={() => sortData("tradeVolume")}>
                VOLUME {renderSortIcon("tradeVolume")}
              </th>
              <th>
                TOKEN AGE
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((rowData, index) => (
              <TokenRow
                data={rowData}
                key={index}
                onTokenSelect={handleTokenSelect}
              />
            ))}
          </tbody>
        </table>
      </div>

      {selectedToken && <TokenDetails token={selectedToken} />}
    </div>
  );
};

export default TokenTable;
