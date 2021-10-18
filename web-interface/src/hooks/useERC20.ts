import { useMemo, useEffect, useState, useCallback } from "react"
import { ethers } from "ethers"
import ERC20ABI from "../constants/abi/ERC20.json" 

export const useERC20 = (address: any, account: any, library: any) => {
  const erc20Contract: any = useMemo(() => {
    if (!account || !address || !library) {
      return;
    }
    return new ethers.Contract(address, ERC20ABI, library.getSigner());
  }, [account, address, library]);

  const [balance, setBalance] = useState(0);
  const [balanceUsd] = useState(0);
  const [decimals, setDecimals] = useState(18);
  const [symbol, setSymbol] = useState("--");

  const getBalance = useCallback(async () => {
    try {
      const decimals = await erc20Contract.decimals();
      const balance = await erc20Contract.balanceOf(account);
      return Number(ethers.utils.formatUnits(balance, decimals));
    } catch (e) {
      return 0;
    }
  }, [erc20Contract, account]);

  const getSymbol = useCallback(async () => {
    try {
      return await erc20Contract.symbol();
    } catch (e) {
      return "--";
    }
  }, [erc20Contract, account]);

  const getDecimals = useCallback(async () => {
    // USDC
    if (address === "0x2791bca1f2de4661ed88a30c99a7a9449aa84174") {
      return 6;
    }

    try {
      const decimals = await erc20Contract.decimals();
      return Number(decimals);
    } catch (e) {
      return 0;
    }
  }, [erc20Contract, account, address]);

  const allowance = useCallback(
    async (address) => {
      return await erc20Contract.allowance(account, address);
    },
    [erc20Contract, account]
  );

  const approve = useCallback(
    async (address) => {
      return await erc20Contract.approve(address, ethers.constants.MaxUint256);
    },
    [erc20Contract, account]
  );

  useEffect(() => {
    erc20Contract && getBalance().then(setBalance);
    erc20Contract && getDecimals().then(setDecimals);
    erc20Contract && getSymbol().then(setSymbol);
  }, [account, erc20Contract]);

  return {
    balance,
    balanceUsd,
    decimals,
    address,
    symbol,
    allowance,
    approve,
  };
};