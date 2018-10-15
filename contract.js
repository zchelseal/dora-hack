const solc = require('solc');

let contract = `
pragma solidity ^0.4.25;

contract Translation {
    
    mapping (address => uint) contributorToReward;
    address[] translators;
    address reviewer;
    bool public reviewed;
    address owner;
    uint reviewerReward;
    
    constructor() public {
        owner = msg.sender;
        reviewed = false;
    }
    
    function payTranslationFee() public payable {
        require(msg.sender == owner);
    }
    
    function registerAsTranslator(uint _reward) public {
        translators.push(msg.sender);
        contributorToReward[msg.sender] = _reward;
    }
    
    function registerAsReviwer(uint _reward) public {
        reviewer = msg.sender;
        reviewerReward = _reward;
    }
    
    function getTranslators() public view returns (uint){
        return translators.length;
    }
    
    function getReviewer() public view returns (address){
        return reviewer;
    }
    
    function getRewardByTranslator(address _address)  public view returns (uint){
        return contributorToReward[_address];
    }
    
    function getRewardByReviewer()  public view returns (uint){
        return reviewerReward;
    }
    
    function approve() public {
        require(msg.sender == reviewer);
        reviewed = true;
    }
    
    function translatorsWithdrawl() public {
        require(contributorToReward[msg.sender] > 0);
        require(reviewed == true);
        msg.sender.transfer(contributorToReward[msg.sender]);
        contributorToReward[msg.sender] = 0;
    }
    
    function reviewerWithdrawl() public {
        require(reviewerReward > 0);
        require(reviewer == msg.sender);
        require(reviewed == true);
        msg.sender.transfer(reviewerReward);
        reviewerReward = 0;
    }
    
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
`

const output = solc.compile(contract, 1);

console.log(output)