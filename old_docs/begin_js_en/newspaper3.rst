Newspaper delivery revisited again
==================================

Let's go back to our newspaper delivery example. Below is an outline of
a solution that will work both Ms. Lovelace's world **NewspaperÂ 1**, and Mr.
Babbage's **NewspaperÂ 2**::

    function climb_up_one_floor() {
        turn_left();
        move();
        turn_right();
        move();
        move();
    }

    function climb_down_one_floor() {
        move();
        move();
        turn_left();
        move();
        turn_right();
    }

    function get_money() {
        while ( ... ) {
          // single line of code
        }
    }

    // === End of definitions ===

    take("star");
    while ( !token_here() ){
        // single line of code
    }
    get_money();
    put("star"); // leave paper
    turn_around();
    while ( ! ... ){
        // single line of code
    }

It is up to you to fill up the missing tests and other lines of code.
Once you are done, you might want to go back to 
`Newspaper delivery revisited <newspaper2.html>`_ and see how much shorter this new
version, which works in both worlds, is as compared with the old one which only
worked in one of the two worlds.

