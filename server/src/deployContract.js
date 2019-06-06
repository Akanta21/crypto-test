const zilliqa = require('./zilliqa')
const { BN, Long, bytes, units } = require('@zilliqa-js/util');
const CP = require('@zilliqa-js/crypto');

const CHAIN_ID = 333;
const MSG_VERSION = 1;
const VERSION = bytes.pack(CHAIN_ID, MSG_VERSION);

zilliqa.wallet.addByPrivateKey(
  "xxx_private_key"
);

const publicKey = CP.getPubKeyFromPrivateKey("xxx_private_key")

async function testBlockchain() {
  try {
    const code = `scilla_version 0
    

  (* This contract implements a fungible token interface a la ERC20.*)

  (***************************************************)
  (*               Associated library                *)
  (***************************************************)
  library FungibleToken

  let one = Uint128 1
  let zero = Uint128 0

  let min_int =
    fun (a : Uint128) => fun (b : Uint128) =>
    let alt = builtin lt a b in
    match alt with
    | True =>
      a
    | False =>
      b
    end

  let le_int =
    fun (a : Uint128) => fun (b : Uint128) =>
      let x = builtin lt a b in
      match x with
      | True => True
      | False =>
        let y = builtin eq a b in
        match y with
        | True => True
        | False => False
        end
      end

  (* returns singleton List Message *)
  let one_msg =
      fun (msg : Message) =>
          let nil_msg = Nil {Message} in
          Cons {Message} msg nil_msg


  (***************************************************)
  (*             The contract definition             *)
  (***************************************************)

  contract BobToken
  (owner : ByStr20,
   total_tokens : Uint128,
   decimals : Uint32,
   name : String,
   symbol : String)

  (* Initial balance is not stated explicitly: it's initialized when creating the contract. *)

  field balances : Map ByStr20 Uint128 =
    let m = Emp ByStr20 Uint128 in
      builtin put m owner total_tokens
  field allowed : Map ByStr20 (Map ByStr20 Uint128) = Emp ByStr20 (Map ByStr20 Uint128)

  transition BalanceOf (tokenOwner : ByStr20)
    bal <- balances[tokenOwner];
    match bal with
    | Some v =>
      msg = { _tag : "BalanceOfResponse"; _recipient : _sender; _amount : zero;
              address : tokenOwner; balance : v};
      msgs = one_msg msg;
      send msgs
    | None =>
      msg = { _tag : "BalanceOfResponse"; _recipient : _sender; _amount : zero;
              address : tokenOwner; balance : zero};
      msgs = one_msg msg;
      send msgs
    end
  end

  transition TotalSupply ()
    msg = { _tag : "TotalSupplyResponse"; _recipient : _sender; _amount : zero;
            caller : _sender; totalSupply : total_tokens};
    msgs = one_msg msg;
    send msgs
  end

  transition Transfer (to : ByStr20, tokens : Uint128)
    bal <- balances[_sender];
    match bal with
    | Some b =>
      can_do = le_int tokens b;
      match can_do with
      | True =>
        (* subtract tokens from _sender and add it to "to" *)
        new_sender_bal = builtin sub b tokens;
        balances[_sender] := new_sender_bal;

        (* Adds tokens to "to" address *)
        to_bal <- balances[to];
        new_to_bal = match to_bal with
        | Some x => builtin add x tokens
        | None => tokens
        end;

        balances[to] := new_to_bal;
        msg = { _tag : "TransferSuccess"; _recipient : _sender; _amount : zero;
                sender : _sender; recipient : to; amount : tokens};
        msgs = one_msg msg;
        send msgs
      | False =>
        (* balance not sufficient. *)
        msg = { _tag : "TransferFailure"; _recipient : _sender; _amount : zero;
                sender : _sender; recipient : to; amount : zero};
        msgs = one_msg msg;
        send msgs
      end
    | None =>
      (* no balance record, can't transfer *)
      msg = { _tag : "TransferFailure"; _recipient : _sender; _amount : zero;
              sender : _sender; recipient : to; amount : zero};
      msgs = one_msg msg;
      send msgs
    end
  end

  transition TransferFrom (from : ByStr20, to : ByStr20, tokens : Uint128)
    bal <- balances[from];
    (* Check if _sender has been authorized by "from" *)
    sender_allowed_from <- allowed[from][_sender];
    match bal with
    | Some a =>
      match sender_allowed_from with
      | Some b =>
          (* We can only transfer the minimum of available or authorized tokens *)
          t = min_int a b;
          can_do = le_int tokens t;
          match can_do with
          | True =>
              (* tokens is what we should subtract from "from" and add to "to" *)
              new_from_bal = builtin sub a tokens;
              balances[from] := new_from_bal;
              to_bal <- balances[to];
              match to_bal with
              | Some tb =>
                  new_to_bal = builtin add tb tokens;
                  balances[to] := new_to_bal
              | None =>
                  (* "to" has no balance. So just set it to tokens *)
                  balances[to] := tokens
              end;
              (* reduce "allowed" by "tokens" *)
              new_allowed = builtin sub b tokens;
              allowed[from][_sender] := new_allowed;
              msg = { _tag : "TransferFromSuccess"; _recipient : _sender; _amount : zero;
                      sender : from; recipient : to; amount : tokens };
              msgs = one_msg msg;
              send msgs
          | False =>
              msg = { _tag : "TransferFromFailure"; _recipient : _sender; _amount : zero;
                      sender : from; recipient : to; amount : zero };
              msgs = one_msg msg;
              send msgs
          end
      | None =>
          msg = { _tag : "TransferFromFailure"; _recipient : _sender; _amount : zero;
                  sender : from; recipient : to; amount : zero };
          msgs = one_msg msg;
          send msgs
      end
    | None =>
    msg = { _tag : "TransferFromFailure"; _recipient : _sender; _amount : zero;
              sender : from; recipient : to; amount : zero };
      msgs = one_msg msg;
      send msgs
    end
  end

  transition Approve (spender : ByStr20, tokens : Uint128)
    allowed[_sender][spender] := tokens;
    msg = { _tag : "ApproveSuccess"; _recipient : _sender; _amount : zero;
            approver : _sender; spender : spender; amount : tokens };
    msgs = one_msg msg;
    send msgs
  end

  transition Allowance (tokenOwner : ByStr20, spender : ByStr20)
    spender_allowance <- allowed[tokenOwner][spender];
    match spender_allowance with
    | Some n =>
        msg = { _tag : "AllowanceResponse"; _recipient : _sender; _amount : zero;
                owner : tokenOwner; spender : spender; amount : n };
        msgs = one_msg msg;
        send msgs
    | None =>
        msg = { _tag : "AllowanceResponse"; _recipient : _sender; _amount : zero;
                owner : tokenOwner; spender : spender; amount : zero };
        msgs = one_msg msg;
        send msgs
    end
  end`;

    const init = [
      // this parameter is mandatory for all init arrays
      { type: 'Uint32', value: '0', vname: '_scilla_version' },
      {
        vname: "owner",
        type: "ByStr20",
        // NOTE: all byte strings passed to Scilla contracts _must_ be
        // prefixed with 0x. Failure to do so will result in the network
        // rejecting the transaction while consuming gas!
        value: '0xd90f2e538ce0df89c8273cad3b63ec44a3c4ed82'
      },
      { type: 'Uint128', value: '888888888888888', vname: 'total_tokens' },
      { type: 'Uint32', value: '12', vname: 'decimals' },
      { type: 'String', value: 'BobCoin', vname: 'name' },
      { type: 'String', value: 'BOB', vname: 'symbol' },
      {
        vname: '_creation_block',
        type: 'BNum',
        value: '100',
      },
    ];

    // Instance of class Contract
    const contract = zilliqa.contracts.new(code, init);
    const myGasPrice = units.toQa('3000', units.Units.Li);
    console.log('start deployment')
    // Deploy the contract
    const [deployTx, hello] = await contract.deploy({
      version: VERSION,
      gasPrice: myGasPrice,
      gasLimit: Long.fromNumber(100000),
    }, 50, 100);

    // Introspect the state of the underlying transaction
    console.log(`Deployment Transaction ID: ${deployTx.id}`);
    console.log(`Deployment Transaction Receipt:`);
    console.log(deployTx.txParams.receipt);

    // Get the deployed contract address
    console.log("The contract address is:");
    console.log(hello.address);

    //Get the contract state
    const state = await hello.getState();
    console.log("The state of the contract is:");
    console.log(state);
  } catch (err) {
    console.log(err)
  }
}

testBlockchain();

// 0x2b2ab0aB1964E9F49fa8Fec72182e3B6E30525Da
// 0xB38122df13F28b919Be6169ae0E8fFfB63E66c4d