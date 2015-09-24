# Settler

This is a little for fun idea that I had when I got frustrated while playing Settlers of Catan. This tool was sort of meant to be able to keep track of how often numbers are rolled, and how many resources players have collected during the game. 

There are a lot of versions of Settlers so I tried to keep the idea of a Resource abstract to the point where it is easy to add more of them in the future. 

#Code Organization

Written in Backbone.

-Collections 
Pretty self explanitory.Player collections is a collection of player models. Hex Collection is a collection of hex models. Resource Collection is a collection of resource models. 

-Models 
Game is a model that represents some information that exists outside the scope of anyother model. Information about the game itself that doesn't pertain to any individual Player or hex.
Hex is a model that represents a resource generating hex on the gameboard of Settlers that has a dice roll number, a unique identifier, and a resource type. An Important distinction is that this represents the generation object(i.e. a city or settlement.)

\  Wood /
 \____A/  Wheat
 /     \
/ Brick \

If A is an intersection of three hexes, than a player must create three "Hex"s in order to produce from all three. On hex for the wood hex, one for the wheat hex, one for the brick hex.

Player is a model that represents a player. Any information that pertains to a specific player should live in here. Player name, resources collected, resources stolen, hexes that a player currently has settled. 
Resource is a basic model that represents a resource card in Settlers. 
-Views
GameView sets up the inital HTML structure of the page. Mostly getting all parts of the page onto the page and setting up events that allow things to happen between views. 
HexesView is used to display a collection of hex points on the page, also giving functionality to each of these hexes (i.e. deleting a hex.)
HexInputView allows a player to create a new "hex" resouce collection point. The UI allows for creating two "hex"s at once if in the instance a city is built. To do this, type two resource types in the box.  
PlayerView shows the relevant fields inside a player model.
Resources View shows the contents of a resource collection.
RobberView is purely a behavioral view who fires events back to the game model that tells the game when and where a robber gets moved to and allows the game object to decide whether or not to allocate resources to a player on a dice roll based on the robber's position.
RollView is also purely behavioral sending dice rolls back to the game view who distributes resources based players resource points.
