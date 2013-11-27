$(document).ready(
    function(){
        var pageMessages = [
            "Player #65 just died in a spike trap, I bet you can do better!",
            "Stop drinking that beer and get playing!",
            "Stop smoking that pot and get playing!",
            "No, just stop talking.",
            "Psst, this also plays pretty well on your smart phone.",
            "Stop refreshing the page and get playing!",
            "Hey there sexy, bet you can handle that sword very well..",
            "Hey you, bet you suck less than player #135!",
            "If you stare at this long enough it'll change into a secret message.",
            "That sock does not need to be this complicated dude..",
            "Nothing is funnier than bad taxidermy.",
            "(Above mentioned players have beaten the game)",
            "There are so many messages in this it's insane.",
            "Probably the most work has gone into coming up with a hundred of these messages..",
            "Getting people to google image blue waffle means you still got it.",
            "Did they ever return Cotton Eye Joe's body?",
            "Nothing.",
            "The end.",
            "Chad stop refreshing the page to read all these messages.",
            "I actually really don't like change.",
            "Stop farting and play the damn game.",
            "Hi, game, play, now.",
            "When you celebrate something annually, is that because you're constantly a year too late?",
            "I'd say I like you, but I have no clue who you are.",
            "I've probably put in more messages than people will ever play this.",
            "Player #98 just found the nightmare difficulty level.",
            "There's more to this than there's out in the open.",
            "Oh snap you've spelled the url correctly.",
            "Not the band.",
            "Exploding chests, bangin' donks, traps and purple dildos. GETRUDIS."
        ];
        var msgSeed;

        msgSeed = Math.floor(Math.random()* pageMessages.length);
        $('#playBar').empty()
            .append("<span>" + pageMessages[msgSeed] + "<br><twat>" + "( click logo to play )" + "</twat></span>");
    }
);