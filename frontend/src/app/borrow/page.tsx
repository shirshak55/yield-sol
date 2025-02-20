"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"

interface IToken {
    name: string
    symbol: string
    apr: number
}

export default function Borrow() {
    const { publicKey } = useWallet()
    const [amount, setAmount] = useState("")
    const [token, setToken] = useState<IToken>()
    const [tokenList, setTokenList] = useState<IToken[]>([])

    // TODO: Remove when loadTokenList is complete
    const initList = [
        {
            id: 1,
            name: "Solana",
            symbol: "SOL",
            apr: 5.6,
        },
        {
            id: 2,
            name: "USDC Token",
            symbol: "USDC",
            apr: 4.3,
        },
    ]

    // TODO: Load token list
    const loadTokenList = () => {
        setTokenList(initList)
    }

    // TODO: Implement action
    const handleBorrow = () => {
        console.log("Call contract")
        console.log(amount)
        console.log(token)
        console.log(publicKey)
    }

    const handleOnChangeToken = (e: ChangeEvent<HTMLSelectElement>) => {
        const token = tokenList.find((t) => t.name === e.target.value)
        setToken(token)
    }

    useEffect(() => {
        loadTokenList()
    }, [])

    return (
        <div className={"flex justify-center"}>
            <div className={"min-w-[500px] border-gray-100 border-2 shadow-xl rounded-lg p-10"}>
                <div className={"text-4xl font-bold text-purple-700"}>BORROW</div>
                <div className={"text-gray-500 text-sm my-2"}>
                    Borrow popular Solana tokens at a <span className={"font-bold"}>fixed rate</span>
                </div>
                <div className={"my-10"}>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <input
                            type="number"
                            name="amount"
                            id="amount"
                            className="block w-full rounded-full px-5 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-5 flex items-center">
                            <select
                                id="token"
                                name="token"
                                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                onChange={(e) => handleOnChangeToken(e)}
                            >
                                {tokenList.map((token) => (
                                    <option key={token.name} value={token.name}>
                                        {token.symbol}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {token && (
                    <div className={"my-10"}>
                        <div className={"rounded-full bg-green-400 w-fit py-4 px-6"}>
                            <span className={"text-2xl font-bold"}>{token ? token.apr : "~"}</span>
                            <span>
                                {" "}
                                %APR {token ? "on " : ""} {token?.name}
                            </span>
                        </div>
                    </div>
                )}

                <div className={"mt-16"}>
                    <button
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full w-full"
                        onClick={handleBorrow}
                    >
                        Next Step
                    </button>
                </div>
            </div>
        </div>
    )
}
