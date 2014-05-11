self.onmessage = function (a) {
    function r(k, a) {
        0 > k && (k = 0);
        0 > a && (a = 0);
        k >= d && (k = d - 1);
        a >= e && (a = e - 1);
        var b = 4 * (a * d + k);
        return [c.data[b + 0], c.data[b + 1], c.data[b + 2], c.data[b + 3]]
    }

    function s(a, b, e, f, g, h) {
        a = 4 * (b * d + a);
        c.data[a + 0] = e;
        c.data[a + 1] = f;
        c.data[a + 2] = g;
        c.data[a + 3] = h
    }
    var c = a.data.imagedata,
        d = a.data.width,
        e = a.data.height;
    a = a.data.radius;
    var b, f, g, h, l = (2 * a + 1) * (2 * a + 1),
        t = d * e,
        q = 0;
    for (y = 0; y < e; y++)
        for (x = 0; x < d; x++) {
            b = Math.round((y * d + e) / t * 100);
            b > q && (q = b, postMessage({
                status: "progress",
                progress: b
            }));
            h = g = f = b = 0;
            for (var n = -a; n <= a; n++)
                for (var p = -a; p <= a; p++) {
                    var m = r(x + p, y + n);
                    b += m[0];
                    f += m[1];
                    g += m[2];
                    h += m[3]
                }
            s(x, y, Math.round(b / l), Math.round(f / l), Math.round(g / l), Math.round(h / l))
        }
    postMessage({
        status: "done",
        imagedata: c
    })
};