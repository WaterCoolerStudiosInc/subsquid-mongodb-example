import {Abi, Bytes, encodeCall, decodeResult} from "@subsquid/ink-abi"

export const metadata = {
  "source": {
    "hash": "0x295876292954dbec9d4d414eac7cb6ca483a8ffd32c2ae84778ac7163038f234",
    "language": "ink! 4.3.0",
    "compiler": "rustc 1.75.0",
    "build_info": {
      "build_mode": "Release",
      "cargo_contract_version": "3.2.0",
      "rust_toolchain": "stable-aarch64-apple-darwin",
      "wasm_opt_settings": {
        "keep_debug_symbols": false,
        "optimization_passes": "Z"
      }
    }
  },
  "contract": {
    "name": "vault",
    "version": "0.1.0",
    "authors": [
      "[your_name] <[your_email]>"
    ]
  },
  "spec": {
    "constructors": [
      {
        "args": [
          {
            "label": "share_token_hash",
            "type": {
              "displayName": [
                "Hash"
              ],
              "type": 8
            }
          },
          {
            "label": "registry_code_hash",
            "type": {
              "displayName": [
                "Hash"
              ],
              "type": 8
            }
          }
        ],
        "default": false,
        "docs": [],
        "label": "new",
        "payable": false,
        "returnType": {
          "displayName": [
            "ink_primitives",
            "ConstructorResult"
          ],
          "type": 9
        },
        "selector": "0x9bae9d5e"
      }
    ],
    "docs": [],
    "environment": {
      "accountId": {
        "displayName": [
          "AccountId"
        ],
        "type": 0
      },
      "balance": {
        "displayName": [
          "Balance"
        ],
        "type": 4
      },
      "blockNumber": {
        "displayName": [
          "BlockNumber"
        ],
        "type": 30
      },
      "chainExtension": {
        "displayName": [
          "ChainExtension"
        ],
        "type": 31
      },
      "hash": {
        "displayName": [
          "Hash"
        ],
        "type": 8
      },
      "maxEventTopics": 4,
      "timestamp": {
        "displayName": [
          "Timestamp"
        ],
        "type": 3
      }
    },
    "events": [
      {
        "args": [
          {
            "docs": [],
            "indexed": true,
            "label": "staker",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "azero",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "new_shares",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "virtual_shares",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          }
        ],
        "docs": [],
        "label": "Staked"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": false,
            "label": "caller",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "azero",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "incentive",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "virtual_shares",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          }
        ],
        "docs": [],
        "label": "Restaked"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": true,
            "label": "staker",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "shares",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "unlock_id",
            "type": {
              "displayName": [
                "u128"
              ],
              "type": 4
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "batch_id",
            "type": {
              "displayName": [
                "u64"
              ],
              "type": 3
            }
          }
        ],
        "docs": [],
        "label": "UnlockRequested"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": true,
            "label": "staker",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "shares",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "batch_id",
            "type": {
              "displayName": [
                "u64"
              ],
              "type": 3
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "unlock_id",
            "type": {
              "displayName": [
                "u128"
              ],
              "type": 4
            }
          }
        ],
        "docs": [],
        "label": "UnlockCanceled"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": true,
            "label": "batch_id",
            "type": {
              "displayName": [
                "u64"
              ],
              "type": 3
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "shares",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "virtual_shares",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "spot_value",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          }
        ],
        "docs": [],
        "label": "BatchUnlockSent"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": true,
            "label": "staker",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "azero",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "batch_id",
            "type": {
              "displayName": [
                "u64"
              ],
              "type": 3
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "unlock_id",
            "type": {
              "displayName": [
                "u64"
              ],
              "type": 3
            }
          }
        ],
        "docs": [],
        "label": "UnlockRedeemed"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": false,
            "label": "shares",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          }
        ],
        "docs": [],
        "label": "FeesWithdrawn"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": false,
            "label": "new_fee",
            "type": {
              "displayName": [
                "u16"
              ],
              "type": 7
            }
          },
          {
            "docs": [],
            "indexed": false,
            "label": "virtual_shares",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          }
        ],
        "docs": [],
        "label": "FeesAdjusted"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": false,
            "label": "new_minimum_stake",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          }
        ],
        "docs": [],
        "label": "MinimumStakeAdjusted"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": false,
            "label": "new_account",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          }
        ],
        "docs": [],
        "label": "OwnershipTransferred"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": false,
            "label": "new_account",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          }
        ],
        "docs": [],
        "label": "RoleSetFeesTransferred"
      },
      {
        "args": [
          {
            "docs": [],
            "indexed": false,
            "label": "new_account",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          }
        ],
        "docs": [],
        "label": "RoleSetFeesAdminTransferred"
      }
    ],
    "lang_error": {
      "displayName": [
        "ink",
        "LangError"
      ],
      "type": 11
    },
    "messages": [
      {
        "args": [],
        "default": false,
        "docs": [
          " Allow users to convert AZERO into sAZERO",
          " Mints the caller sAZERO based on the redemption ratio",
          "",
          " Minimum AZERO amount is required to stake",
          " AZERO must be transferred via transferred_value"
        ],
        "label": "stake",
        "mutates": true,
        "payable": true,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 12
        },
        "selector": "0x5adb38de"
      },
      {
        "args": [
          {
            "label": "shares",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          }
        ],
        "default": false,
        "docs": [
          " Allow user to begin the unlock process",
          " Transfers sAZERO specified in `shares` argument to the vault contract",
          " Unlock is batched into current two day batch request",
          "",
          " Caller must approve the psp22 token contract beforehand"
        ],
        "label": "request_unlock",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0x2794ea0e"
      },
      {
        "args": [
          {
            "label": "user_unlock_id",
            "type": {
              "displayName": [
                "u128"
              ],
              "type": 4
            }
          }
        ],
        "default": false,
        "docs": [
          " Allow user to cancel their unlock request",
          "",
          " Must be done in the same batch interval in which the request was originally sent"
        ],
        "label": "cancel_unlock_request",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0x1fdadccd"
      },
      {
        "args": [
          {
            "label": "batch_ids",
            "type": {
              "displayName": [
                "Vec"
              ],
              "type": 20
            }
          }
        ],
        "default": false,
        "docs": [
          " Trigger unlock requests of previous batched requests",
          " Distributes unlock requests to nominators according to current stake imbalances",
          " Calculates a batch spot values for sAZERO in the batches",
          " Burns associated sAZERO",
          "",
          " Cannot be called for a batch that has not concluded",
          " Cannot be called for a batch that has already been redeemed"
        ],
        "label": "send_batch_unlock_requests",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0xe4ff1655"
      },
      {
        "args": [
          {
            "label": "user",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          },
          {
            "label": "unlock_id",
            "type": {
              "displayName": [
                "u64"
              ],
              "type": 3
            }
          }
        ],
        "default": false,
        "docs": [
          " Allows a user to withdraw staked AZERO",
          "",
          " Returns original deposit amount plus interest to depositor address",
          " Queries the redeemable amount by user AccountId and Claim Vector index",
          " Associated batch unlock request must have been completed",
          " Deletes the user's unlock request",
          " Burns the associated sAZERO tokens"
        ],
        "label": "redeem",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0xec3e9290"
      },
      {
        "args": [
          {
            "label": "user",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          },
          {
            "label": "unlock_id",
            "type": {
              "displayName": [
                "u64"
              ],
              "type": 3
            }
          }
        ],
        "default": false,
        "docs": [
          " Alternative method for a user to withdraw staked AZERO",
          "",
          " This should be called instead of `redeem()` when insufficient AZERO exists in the Vault and",
          " validator(s) have unbonded AZERO which can be claimed"
        ],
        "label": "redeem_with_withdraw",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0x8021c15e"
      },
      {
        "args": [],
        "default": false,
        "docs": [
          " Attempts to claim unbonded AZERO from all validators"
        ],
        "label": "delegate_withdraw_unbonded",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0x7787b52e"
      },
      {
        "args": [],
        "default": false,
        "docs": [
          " Restake earned interest for all validators",
          "",
          " Can be called by anyone",
          " Caller earns a fee of 1/1000 of restaked interest as defined by the Agent"
        ],
        "label": "restake",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0x47b55b8a"
      },
      {
        "args": [],
        "default": false,
        "docs": [
          " =========================== Restricted Functions: Owner Role ===========================",
          " Claim fees by inflating sAZERO supply",
          "",
          " Caller must have the owner role (`role_owner`)",
          " Mints virtual shares as sAZERO to the owner",
          " Effectively serves as a compounding for protocol fee",
          " sets total_shares_virtual to 0"
        ],
        "label": "withdraw_fees",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0xf7e92e05"
      },
      {
        "args": [
          {
            "label": "new_minimum_stake",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          }
        ],
        "default": false,
        "docs": [
          " Update the minimum stake amount",
          "",
          " Caller must have the owner role (`role_owner`)"
        ],
        "label": "adjust_minimum_stake",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0x02cf731f"
      },
      {
        "args": [
          {
            "label": "code_hash",
            "type": {
              "displayName": [],
              "type": 1
            }
          }
        ],
        "default": false,
        "docs": [
          " Upgrade the contract by the ink env set_code_hash function",
          "",
          " Caller must have the owner role (`role_owner`)",
          " See ink documentation for details https://paritytech.github.io/ink/ink_env/fn.set_code_hash.html"
        ],
        "label": "set_code",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0x694fb50f"
      },
      {
        "args": [
          {
            "label": "new_account",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [
          " Transfers ownership to a new account",
          "",
          " Caller must have the owner role (`role_owner`)"
        ],
        "label": "transfer_role_owner",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0xe3289c4a"
      },
      {
        "args": [
          {
            "label": "new_fee",
            "type": {
              "displayName": [
                "u16"
              ],
              "type": 7
            }
          }
        ],
        "default": false,
        "docs": [
          " ======================== Restricted Functions: Adjust Fee Role ========================",
          " Update the protocol fee",
          "",
          " Caller must have the adjust fee role (`role_adjust_fee`)",
          " Updates the total_shares_virtual accumulator at the old fee level first"
        ],
        "label": "adjust_fee",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0x8a7c9af3"
      },
      {
        "args": [
          {
            "label": "new_account",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [
          " Transfers adjust fee role to a new account",
          "",
          " Caller must be the admin for the adjust fee role (`role_adjust_fee_admin`)"
        ],
        "label": "transfer_role_adjust_fee",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0x61b06798"
      },
      {
        "args": [
          {
            "label": "new_account",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [
          " Transfers administration of adjust fee role to a new account",
          "",
          " Caller must be the admin for the adjust fee role (`role_adjust_fee_admin`)"
        ],
        "label": "transfer_role_adjust_fee_admin",
        "mutates": true,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 18
        },
        "selector": "0x87715f58"
      },
      {
        "args": [],
        "default": false,
        "docs": [
          " ================================= Non Mutable Queries ================================="
        ],
        "label": "get_batch_id",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 21
        },
        "selector": "0x21fb8e24"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_creation_time",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 21
        },
        "selector": "0xf5f79633"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_role_owner",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 22
        },
        "selector": "0x00fd9450"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_role_adjust_fee",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 22
        },
        "selector": "0xae0df303"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_role_adjust_fee_admin",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 22
        },
        "selector": "0x922019f8"
      },
      {
        "args": [],
        "default": false,
        "docs": [
          " Returns the total amount of bonded AZERO"
        ],
        "label": "get_total_pooled",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0x627954ca"
      },
      {
        "args": [],
        "default": false,
        "docs": [
          " Returns the shares effectively in circulation by the protocol including:",
          "     1) sAZERO that has already been minted",
          "     2) sAZERO that could be minted (virtual) representing accumulating protocol fees"
        ],
        "label": "get_total_shares",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0x17e02c67"
      },
      {
        "args": [],
        "default": false,
        "docs": [
          " Returns the protocol fees (sAZERO) which can be minted and withdrawn at the current block timestamp"
        ],
        "label": "get_current_virtual_shares",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0x32510c64"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_minimum_stake",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0x25a59cbc"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_fee_percentage",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 24
        },
        "selector": "0x4fd7eacd"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_share_token_contract",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 22
        },
        "selector": "0x30bfce5d"
      },
      {
        "args": [],
        "default": false,
        "docs": [],
        "label": "get_registry_contract",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 22
        },
        "selector": "0x541952c6"
      },
      {
        "args": [
          {
            "label": "azero",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          }
        ],
        "default": false,
        "docs": [
          " Calculate the value of AZERO in terms of sAZERO"
        ],
        "label": "get_shares_from_azero",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0x1f61cfde"
      },
      {
        "args": [
          {
            "label": "shares",
            "type": {
              "displayName": [
                "Balance"
              ],
              "type": 4
            }
          }
        ],
        "default": false,
        "docs": [
          " Calculate the value of sAZERO in terms of AZERO"
        ],
        "label": "get_azero_from_shares",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0x46e2b6ac"
      },
      {
        "args": [
          {
            "label": "user",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [
          " Returns the unlock requests for a given user"
        ],
        "label": "get_unlock_requests",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 25
        },
        "selector": "0x713a250d"
      },
      {
        "args": [
          {
            "label": "user",
            "type": {
              "displayName": [
                "AccountId"
              ],
              "type": 0
            }
          }
        ],
        "default": false,
        "docs": [
          " Returns the number of unlock requests made by a given user"
        ],
        "label": "get_unlock_request_count",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 23
        },
        "selector": "0x69626047"
      },
      {
        "args": [
          {
            "label": "batch_id",
            "type": {
              "displayName": [
                "u64"
              ],
              "type": 3
            }
          }
        ],
        "default": false,
        "docs": [
          " Returns the information of a batch unlock request for the given batch id"
        ],
        "label": "get_batch_unlock_requests",
        "mutates": false,
        "payable": false,
        "returnType": {
          "displayName": [
            "ink",
            "MessageResult"
          ],
          "type": 26
        },
        "selector": "0xb09bcd73"
      }
    ]
  },
  "storage": {
    "root": {
      "layout": {
        "struct": {
          "fields": [
            {
              "layout": {
                "struct": {
                  "fields": [
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 0
                        }
                      },
                      "name": "role_owner"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 0
                        }
                      },
                      "name": "role_adjust_fee"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 0
                        }
                      },
                      "name": "role_adjust_fee_admin"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 3
                        }
                      },
                      "name": "creation_time"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 4
                        }
                      },
                      "name": "total_pooled"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 4
                        }
                      },
                      "name": "total_shares_minted"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 4
                        }
                      },
                      "name": "total_shares_virtual"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 4
                        }
                      },
                      "name": "minimum_stake"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "struct": {
                              "fields": [
                                {
                                  "layout": {
                                    "leaf": {
                                      "key": "0xfe06b35d",
                                      "ty": 4
                                    }
                                  },
                                  "name": "total_shares"
                                },
                                {
                                  "layout": {
                                    "enum": {
                                      "dispatchKey": "0xfe06b35d",
                                      "name": "Option",
                                      "variants": {
                                        "0": {
                                          "fields": [],
                                          "name": "None"
                                        },
                                        "1": {
                                          "fields": [
                                            {
                                              "layout": {
                                                "leaf": {
                                                  "key": "0xfe06b35d",
                                                  "ty": 4
                                                }
                                              },
                                              "name": "0"
                                            }
                                          ],
                                          "name": "Some"
                                        }
                                      }
                                    }
                                  },
                                  "name": "value_at_redemption"
                                },
                                {
                                  "layout": {
                                    "enum": {
                                      "dispatchKey": "0xfe06b35d",
                                      "name": "Option",
                                      "variants": {
                                        "0": {
                                          "fields": [],
                                          "name": "None"
                                        },
                                        "1": {
                                          "fields": [
                                            {
                                              "layout": {
                                                "leaf": {
                                                  "key": "0xfe06b35d",
                                                  "ty": 3
                                                }
                                              },
                                              "name": "0"
                                            }
                                          ],
                                          "name": "Some"
                                        }
                                      }
                                    }
                                  },
                                  "name": "redemption_timestamp"
                                }
                              ],
                              "name": "UnlockRequestBatch"
                            }
                          },
                          "root_key": "0xfe06b35d"
                        }
                      },
                      "name": "batch_unlock_requests"
                    },
                    {
                      "layout": {
                        "root": {
                          "layout": {
                            "leaf": {
                              "key": "0x2b01f583",
                              "ty": 5
                            }
                          },
                          "root_key": "0x2b01f583"
                        }
                      },
                      "name": "user_unlock_requests"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 3
                        }
                      },
                      "name": "cooldown_period"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 3
                        }
                      },
                      "name": "batch_interval_delay"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 3
                        }
                      },
                      "name": "last_fee_update"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 7
                        }
                      },
                      "name": "fee_percentage"
                    },
                    {
                      "layout": {
                        "leaf": {
                          "key": "0x00000000",
                          "ty": 0
                        }
                      },
                      "name": "shares_contract"
                    },
                    {
                      "layout": {
                        "struct": {
                          "fields": [
                            {
                              "layout": {
                                "struct": {
                                  "fields": [
                                    {
                                      "layout": {
                                        "leaf": {
                                          "key": "0x00000000",
                                          "ty": 0
                                        }
                                      },
                                      "name": "account_id"
                                    }
                                  ],
                                  "name": "CallBuilder"
                                }
                              },
                              "name": "inner"
                            }
                          ],
                          "name": "RegistryRef"
                        }
                      },
                      "name": "registry_contract"
                    }
                  ],
                  "name": "VaultData"
                }
              },
              "name": "data"
            }
          ],
          "name": "Vault"
        }
      },
      "root_key": "0x00000000"
    }
  },
  "types": [
    {
      "id": 0,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 1,
                "typeName": "[u8; 32]"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "types",
          "AccountId"
        ]
      }
    },
    {
      "id": 1,
      "type": {
        "def": {
          "array": {
            "len": 32,
            "type": 2
          }
        }
      }
    },
    {
      "id": 2,
      "type": {
        "def": {
          "primitive": "u8"
        }
      }
    },
    {
      "id": 3,
      "type": {
        "def": {
          "primitive": "u64"
        }
      }
    },
    {
      "id": 4,
      "type": {
        "def": {
          "primitive": "u128"
        }
      }
    },
    {
      "id": 5,
      "type": {
        "def": {
          "sequence": {
            "type": 6
          }
        }
      }
    },
    {
      "id": 6,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "name": "creation_time",
                "type": 3,
                "typeName": "Timestamp"
              },
              {
                "name": "share_amount",
                "type": 4,
                "typeName": "Balance"
              },
              {
                "name": "batch_id",
                "type": 3,
                "typeName": "u64"
              }
            ]
          }
        },
        "path": [
          "vault",
          "data",
          "UnlockRequest"
        ]
      }
    },
    {
      "id": 7,
      "type": {
        "def": {
          "primitive": "u16"
        }
      }
    },
    {
      "id": 8,
      "type": {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 1,
                "typeName": "[u8; 32]"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "types",
          "Hash"
        ]
      }
    },
    {
      "id": 9,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 10
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 10,
      "type": {
        "def": {
          "tuple": []
        }
      }
    },
    {
      "id": 11,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 1,
                "name": "CouldNotReadInput"
              }
            ]
          }
        },
        "path": [
          "ink_primitives",
          "LangError"
        ]
      }
    },
    {
      "id": 12,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 13
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 13
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 13,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 4
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 14
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 4
          },
          {
            "name": "E",
            "type": 14
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 14,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "InvalidFee"
              },
              {
                "index": 1,
                "name": "InvalidBatchUnlockRequest"
              },
              {
                "index": 2,
                "name": "InvalidUserUnlockRequest"
              },
              {
                "index": 3,
                "name": "CooldownPeriod"
              },
              {
                "index": 4,
                "name": "InvalidPermissions"
              },
              {
                "index": 5,
                "name": "NoChange"
              },
              {
                "index": 6,
                "name": "MinimumStake"
              },
              {
                "fields": [
                  {
                    "type": 15,
                    "typeName": "String"
                  }
                ],
                "index": 7,
                "name": "InkEnvError"
              },
              {
                "fields": [
                  {
                    "type": 16,
                    "typeName": "RuntimeError"
                  }
                ],
                "index": 8,
                "name": "InternalError"
              },
              {
                "fields": [
                  {
                    "type": 17,
                    "typeName": "PSP22Error"
                  }
                ],
                "index": 9,
                "name": "TokenError"
              },
              {
                "index": 10,
                "name": "InternalTokenError"
              }
            ]
          }
        },
        "path": [
          "vault",
          "data",
          "VaultError"
        ]
      }
    },
    {
      "id": 15,
      "type": {
        "def": {
          "primitive": "str"
        }
      }
    },
    {
      "id": 16,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "CallRuntimeFailed"
              },
              {
                "index": 1,
                "name": "Unauthorized"
              },
              {
                "index": 2,
                "name": "NotInitialized"
              },
              {
                "index": 3,
                "name": "InvalidDeposit"
              },
              {
                "index": 4,
                "name": "InvalidWithdraw"
              }
            ]
          }
        },
        "path": [
          "vault",
          "utils",
          "RuntimeError"
        ]
      }
    },
    {
      "id": 17,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 15,
                    "typeName": "String"
                  }
                ],
                "index": 0,
                "name": "Custom"
              },
              {
                "index": 1,
                "name": "InsufficientBalance"
              },
              {
                "index": 2,
                "name": "InsufficientAllowance"
              },
              {
                "index": 3,
                "name": "ZeroRecipientAddress"
              },
              {
                "index": 4,
                "name": "ZeroSenderAddress"
              },
              {
                "fields": [
                  {
                    "type": 15,
                    "typeName": "String"
                  }
                ],
                "index": 5,
                "name": "SafeTransferCheckFailed"
              }
            ]
          }
        },
        "path": [
          "psp22",
          "errors",
          "PSP22Error"
        ]
      }
    },
    {
      "id": 18,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 19
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 19
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 19,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 10
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 14
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 10
          },
          {
            "name": "E",
            "type": 14
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 20,
      "type": {
        "def": {
          "sequence": {
            "type": 3
          }
        }
      }
    },
    {
      "id": 21,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 3
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 3
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 22,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 0
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 0
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 23,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 4
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 4
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 24,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 7
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 7
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 25,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 5
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 5
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 26,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 27
                  }
                ],
                "index": 0,
                "name": "Ok"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "index": 1,
                "name": "Err"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 27
          },
          {
            "name": "E",
            "type": 11
          }
        ],
        "path": [
          "Result"
        ]
      }
    },
    {
      "id": 27,
      "type": {
        "def": {
          "tuple": [
            4,
            28,
            29
          ]
        }
      }
    },
    {
      "id": 28,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "None"
              },
              {
                "fields": [
                  {
                    "type": 4
                  }
                ],
                "index": 1,
                "name": "Some"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 4
          }
        ],
        "path": [
          "Option"
        ]
      }
    },
    {
      "id": 29,
      "type": {
        "def": {
          "variant": {
            "variants": [
              {
                "index": 0,
                "name": "None"
              },
              {
                "fields": [
                  {
                    "type": 3
                  }
                ],
                "index": 1,
                "name": "Some"
              }
            ]
          }
        },
        "params": [
          {
            "name": "T",
            "type": 3
          }
        ],
        "path": [
          "Option"
        ]
      }
    },
    {
      "id": 30,
      "type": {
        "def": {
          "primitive": "u32"
        }
      }
    },
    {
      "id": 31,
      "type": {
        "def": {
          "variant": {}
        },
        "path": [
          "ink_env",
          "types",
          "NoChainExtension"
        ]
      }
    }
  ],
  "version": "4"
}

const _abi = new Abi(metadata)

export function decodeEvent(bytes: Bytes): Event {
    return _abi.decodeEvent(bytes)
}

export function decodeMessage(bytes: Bytes): Message {
    return _abi.decodeMessage(bytes)
}

export function decodeConstructor(bytes: Bytes): Constructor {
    return _abi.decodeConstructor(bytes)
}

export interface Chain {
    rpc: {
        call<T=any>(method: string, params?: unknown[]): Promise<T>
    }
}

export interface ChainContext {
    _chain: Chain
}

export class Contract {
    constructor(private ctx: ChainContext, private address: Bytes, private blockHash?: Bytes) { }

    get_batch_id(): Promise<Result<u64, LangError>> {
        return this.stateCall('0x21fb8e24', [])
    }

    get_creation_time(): Promise<Result<u64, LangError>> {
        return this.stateCall('0xf5f79633', [])
    }

    get_role_owner(): Promise<Result<AccountId, LangError>> {
        return this.stateCall('0x00fd9450', [])
    }

    get_role_adjust_fee(): Promise<Result<AccountId, LangError>> {
        return this.stateCall('0xae0df303', [])
    }

    get_role_adjust_fee_admin(): Promise<Result<AccountId, LangError>> {
        return this.stateCall('0x922019f8', [])
    }

    get_total_pooled(): Promise<Result<bigint, LangError>> {
        return this.stateCall('0x627954ca', [])
    }

    get_total_shares(): Promise<Result<bigint, LangError>> {
        return this.stateCall('0x17e02c67', [])
    }

    get_current_virtual_shares(): Promise<Result<bigint, LangError>> {
        return this.stateCall('0x32510c64', [])
    }

    get_minimum_stake(): Promise<Result<bigint, LangError>> {
        return this.stateCall('0x25a59cbc', [])
    }

    get_fee_percentage(): Promise<Result<u16, LangError>> {
        return this.stateCall('0x4fd7eacd', [])
    }

    get_share_token_contract(): Promise<Result<AccountId, LangError>> {
        return this.stateCall('0x30bfce5d', [])
    }

    get_registry_contract(): Promise<Result<AccountId, LangError>> {
        return this.stateCall('0x541952c6', [])
    }

    get_shares_from_azero(azero: bigint): Promise<Result<bigint, LangError>> {
        return this.stateCall('0x1f61cfde', [azero])
    }

    get_azero_from_shares(shares: bigint): Promise<Result<bigint, LangError>> {
        return this.stateCall('0x46e2b6ac', [shares])
    }

    get_unlock_requests(user: AccountId): Promise<Result<UnlockRequest[], LangError>> {
        return this.stateCall('0x713a250d', [user])
    }

    get_unlock_request_count(user: AccountId): Promise<Result<bigint, LangError>> {
        return this.stateCall('0x69626047', [user])
    }

    get_batch_unlock_requests(batch_id: u64): Promise<Result<[bigint, (bigint | undefined), (u64 | undefined)], LangError>> {
        return this.stateCall('0xb09bcd73', [batch_id])
    }

    private async stateCall<T>(selector: string, args: any[]): Promise<T> {
        let input = _abi.encodeMessageInput(selector, args)
        let data = encodeCall(this.address, input)
        let result = await this.ctx._chain.rpc.call('state_call', ['ContractsApi_call', data, this.blockHash])
        let value = decodeResult(result)
        return _abi.decodeMessageOutput(selector, value)
    }
}

export interface UnlockRequest {
    creationTime: u64
    shareAmount: bigint
    batchId: u64
}

export type u16 = number

export type AccountId = Bytes

export type LangError = LangError_CouldNotReadInput

export interface LangError_CouldNotReadInput {
    __kind: 'CouldNotReadInput'
}

export type u64 = bigint

export type Constructor = Constructor_new

export interface Constructor_new {
    __kind: 'new'
    shareTokenHash: Hash
    registryCodeHash: Hash
}

export type Hash = Bytes

export type Message = Message_adjust_fee | Message_adjust_minimum_stake | Message_cancel_unlock_request | Message_delegate_withdraw_unbonded | Message_get_azero_from_shares | Message_get_batch_id | Message_get_batch_unlock_requests | Message_get_creation_time | Message_get_current_virtual_shares | Message_get_fee_percentage | Message_get_minimum_stake | Message_get_registry_contract | Message_get_role_adjust_fee | Message_get_role_adjust_fee_admin | Message_get_role_owner | Message_get_share_token_contract | Message_get_shares_from_azero | Message_get_total_pooled | Message_get_total_shares | Message_get_unlock_request_count | Message_get_unlock_requests | Message_redeem | Message_redeem_with_withdraw | Message_request_unlock | Message_restake | Message_send_batch_unlock_requests | Message_set_code | Message_stake | Message_transfer_role_adjust_fee | Message_transfer_role_adjust_fee_admin | Message_transfer_role_owner | Message_withdraw_fees

/**
 *  ======================== Restricted Functions: Adjust Fee Role ========================
 *  Update the protocol fee
 * 
 *  Caller must have the adjust fee role (`role_adjust_fee`)
 *  Updates the total_shares_virtual accumulator at the old fee level first
 */
export interface Message_adjust_fee {
    __kind: 'adjust_fee'
    newFee: u16
}

/**
 *  Update the minimum stake amount
 * 
 *  Caller must have the owner role (`role_owner`)
 */
export interface Message_adjust_minimum_stake {
    __kind: 'adjust_minimum_stake'
    newMinimumStake: bigint
}

/**
 *  Allow user to cancel their unlock request
 * 
 *  Must be done in the same batch interval in which the request was originally sent
 */
export interface Message_cancel_unlock_request {
    __kind: 'cancel_unlock_request'
    userUnlockId: bigint
}

/**
 *  Attempts to claim unbonded AZERO from all validators
 */
export interface Message_delegate_withdraw_unbonded {
    __kind: 'delegate_withdraw_unbonded'
}

/**
 *  Calculate the value of sAZERO in terms of AZERO
 */
export interface Message_get_azero_from_shares {
    __kind: 'get_azero_from_shares'
    shares: bigint
}

/**
 *  ================================= Non Mutable Queries =================================
 */
export interface Message_get_batch_id {
    __kind: 'get_batch_id'
}

/**
 *  Returns the information of a batch unlock request for the given batch id
 */
export interface Message_get_batch_unlock_requests {
    __kind: 'get_batch_unlock_requests'
    batchId: u64
}

export interface Message_get_creation_time {
    __kind: 'get_creation_time'
}

/**
 *  Returns the protocol fees (sAZERO) which can be minted and withdrawn at the current block timestamp
 */
export interface Message_get_current_virtual_shares {
    __kind: 'get_current_virtual_shares'
}

export interface Message_get_fee_percentage {
    __kind: 'get_fee_percentage'
}

export interface Message_get_minimum_stake {
    __kind: 'get_minimum_stake'
}

export interface Message_get_registry_contract {
    __kind: 'get_registry_contract'
}

export interface Message_get_role_adjust_fee {
    __kind: 'get_role_adjust_fee'
}

export interface Message_get_role_adjust_fee_admin {
    __kind: 'get_role_adjust_fee_admin'
}

export interface Message_get_role_owner {
    __kind: 'get_role_owner'
}

export interface Message_get_share_token_contract {
    __kind: 'get_share_token_contract'
}

/**
 *  Calculate the value of AZERO in terms of sAZERO
 */
export interface Message_get_shares_from_azero {
    __kind: 'get_shares_from_azero'
    azero: bigint
}

/**
 *  Returns the total amount of bonded AZERO
 */
export interface Message_get_total_pooled {
    __kind: 'get_total_pooled'
}

/**
 *  Returns the shares effectively in circulation by the protocol including:
 *      1) sAZERO that has already been minted
 *      2) sAZERO that could be minted (virtual) representing accumulating protocol fees
 */
export interface Message_get_total_shares {
    __kind: 'get_total_shares'
}

/**
 *  Returns the number of unlock requests made by a given user
 */
export interface Message_get_unlock_request_count {
    __kind: 'get_unlock_request_count'
    user: AccountId
}

/**
 *  Returns the unlock requests for a given user
 */
export interface Message_get_unlock_requests {
    __kind: 'get_unlock_requests'
    user: AccountId
}

/**
 *  Allows a user to withdraw staked AZERO
 * 
 *  Returns original deposit amount plus interest to depositor address
 *  Queries the redeemable amount by user AccountId and Claim Vector index
 *  Associated batch unlock request must have been completed
 *  Deletes the user's unlock request
 *  Burns the associated sAZERO tokens
 */
export interface Message_redeem {
    __kind: 'redeem'
    user: AccountId
    unlockId: u64
}

/**
 *  Alternative method for a user to withdraw staked AZERO
 * 
 *  This should be called instead of `redeem()` when insufficient AZERO exists in the Vault and
 *  validator(s) have unbonded AZERO which can be claimed
 */
export interface Message_redeem_with_withdraw {
    __kind: 'redeem_with_withdraw'
    user: AccountId
    unlockId: u64
}

/**
 *  Allow user to begin the unlock process
 *  Transfers sAZERO specified in `shares` argument to the vault contract
 *  Unlock is batched into current two day batch request
 * 
 *  Caller must approve the psp22 token contract beforehand
 */
export interface Message_request_unlock {
    __kind: 'request_unlock'
    shares: bigint
}

/**
 *  Restake earned interest for all validators
 * 
 *  Can be called by anyone
 *  Caller earns a fee of 1/1000 of restaked interest as defined by the Agent
 */
export interface Message_restake {
    __kind: 'restake'
}

/**
 *  Trigger unlock requests of previous batched requests
 *  Distributes unlock requests to nominators according to current stake imbalances
 *  Calculates a batch spot values for sAZERO in the batches
 *  Burns associated sAZERO
 * 
 *  Cannot be called for a batch that has not concluded
 *  Cannot be called for a batch that has already been redeemed
 */
export interface Message_send_batch_unlock_requests {
    __kind: 'send_batch_unlock_requests'
    batchIds: u64[]
}

/**
 *  Upgrade the contract by the ink env set_code_hash function
 * 
 *  Caller must have the owner role (`role_owner`)
 *  See ink documentation for details https://paritytech.github.io/ink/ink_env/fn.set_code_hash.html
 */
export interface Message_set_code {
    __kind: 'set_code'
    codeHash: Bytes
}

/**
 *  Allow users to convert AZERO into sAZERO
 *  Mints the caller sAZERO based on the redemption ratio
 * 
 *  Minimum AZERO amount is required to stake
 *  AZERO must be transferred via transferred_value
 */
export interface Message_stake {
    __kind: 'stake'
}

/**
 *  Transfers adjust fee role to a new account
 * 
 *  Caller must be the admin for the adjust fee role (`role_adjust_fee_admin`)
 */
export interface Message_transfer_role_adjust_fee {
    __kind: 'transfer_role_adjust_fee'
    newAccount: AccountId
}

/**
 *  Transfers administration of adjust fee role to a new account
 * 
 *  Caller must be the admin for the adjust fee role (`role_adjust_fee_admin`)
 */
export interface Message_transfer_role_adjust_fee_admin {
    __kind: 'transfer_role_adjust_fee_admin'
    newAccount: AccountId
}

/**
 *  Transfers ownership to a new account
 * 
 *  Caller must have the owner role (`role_owner`)
 */
export interface Message_transfer_role_owner {
    __kind: 'transfer_role_owner'
    newAccount: AccountId
}

/**
 *  =========================== Restricted Functions: Owner Role ===========================
 *  Claim fees by inflating sAZERO supply
 * 
 *  Caller must have the owner role (`role_owner`)
 *  Mints virtual shares as sAZERO to the owner
 *  Effectively serves as a compounding for protocol fee
 *  sets total_shares_virtual to 0
 */
export interface Message_withdraw_fees {
    __kind: 'withdraw_fees'
}

export type Event = Event_BatchUnlockSent | Event_FeesAdjusted | Event_FeesWithdrawn | Event_MinimumStakeAdjusted | Event_OwnershipTransferred | Event_Restaked | Event_RoleSetFeesAdminTransferred | Event_RoleSetFeesTransferred | Event_Staked | Event_UnlockCanceled | Event_UnlockRedeemed | Event_UnlockRequested

export interface Event_BatchUnlockSent {
    __kind: 'BatchUnlockSent'
    batchId: u64
    shares: bigint
    virtualShares: bigint
    spotValue: bigint
}

export interface Event_FeesAdjusted {
    __kind: 'FeesAdjusted'
    newFee: u16
    virtualShares: bigint
}

export interface Event_FeesWithdrawn {
    __kind: 'FeesWithdrawn'
    shares: bigint
}

export interface Event_MinimumStakeAdjusted {
    __kind: 'MinimumStakeAdjusted'
    newMinimumStake: bigint
}

export interface Event_OwnershipTransferred {
    __kind: 'OwnershipTransferred'
    newAccount: AccountId
}

export interface Event_Restaked {
    __kind: 'Restaked'
    caller: AccountId
    azero: bigint
    incentive: bigint
    virtualShares: bigint
}

export interface Event_RoleSetFeesAdminTransferred {
    __kind: 'RoleSetFeesAdminTransferred'
    newAccount: AccountId
}

export interface Event_RoleSetFeesTransferred {
    __kind: 'RoleSetFeesTransferred'
    newAccount: AccountId
}

export interface Event_Staked {
    __kind: 'Staked'
    staker: AccountId
    azero: bigint
    newShares: bigint
    virtualShares: bigint
}

export interface Event_UnlockCanceled {
    __kind: 'UnlockCanceled'
    staker: AccountId
    shares: bigint
    batchId: u64
    unlockId: bigint
}

export interface Event_UnlockRedeemed {
    __kind: 'UnlockRedeemed'
    staker: AccountId
    azero: bigint
    batchId: u64
    unlockId: u64
}

export interface Event_UnlockRequested {
    __kind: 'UnlockRequested'
    staker: AccountId
    shares: bigint
    unlockId: bigint
    batchId: u64
}

export type Result<T, E> = {__kind: 'Ok', value: T} | {__kind: 'Err', value: E}
