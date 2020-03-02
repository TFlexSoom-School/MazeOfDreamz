/*
 * Tristan Hilbert
 * 3/2/2020
 * Systems for automated movement systems/functions
 * 
 */

function movable_steady_translation(ref){
    var diffx = ref.target_movex - ref.x;
    var diffy = ref.target_movey - ref.y;
    var hyp = Math.sqrt(diffx * diffx + diffy * diffy);

    if(hyp > ref.speed){
        var scaler = 0;
        scaler = hyp / ref.speed;
        diffx = Math.round(diffx / scaler);
        diffy = Math.round(diffy / scaler);
    }

    ref.x += diffx;
    ref.y += diffy;
}