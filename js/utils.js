
function range(n)
{
    return new Array(n).fill(0);
}

 function randomColor()
{
    let alph='0123456789abcdef';
    let r = "#";
    for(let i in range(6))
    {
        r+=`${alph[Math.round((Math.random()*100))%16]}`;
    }
    return r;
}

 function doCoexist(a, b)
{
    return a.x==b.x && a.y==b.y;
}