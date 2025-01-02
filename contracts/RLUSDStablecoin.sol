// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title RLUSDStablecoin
 * @dev A standard ERC-20 stablecoin representing USD on the XRPL EVM sidechain.
 */
contract RLUSDStablecoin {
    // ERC-20 basic info
    string public name = "RLUSD Stablecoin";
    string public symbol = "RLUSD";
    uint8 public decimals = 18;

    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(uint256 initialSupply) {
        _mint(msg.sender, initialSupply * 10**decimals);
    }

    // -----------------------
    //       ERC-20
    // -----------------------

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender, 
        address recipient, 
        uint256 amount
    ) public returns (bool) {
        _transfer(sender, recipient, amount);
        uint256 currentAllowance = _allowances[sender][msg.sender];
        require(currentAllowance >= amount, "RLUSD: transfer amount exceeds allowance");
        _approve(sender, msg.sender, currentAllowance - amount);
        return true;
    }

    // -----------------------
    //   INTERNAL FUNCTIONS
    // -----------------------

    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "RLUSD: transfer from the zero address");
        require(recipient != address(0), "RLUSD: transfer to the zero address");
        require(_balances[sender] >= amount, "RLUSD: transfer amount exceeds balance");

        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }

    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "RLUSD: mint to the zero address");
        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    function _approve(
        address owner, 
        address spender, 
        uint256 amount
    ) internal {
        require(owner != address(0), "RLUSD: approve from the zero address");
        require(spender != address(0), "RLUSD: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
}
