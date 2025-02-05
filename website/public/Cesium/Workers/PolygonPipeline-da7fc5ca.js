define([
  'exports',
  './Matrix2-9aa31791',
  './RuntimeError-346a3079',
  './ComponentDatatype-93750d1a',
  './when-4bbc8319',
  './EllipsoidRhumbLine-30c47ff4',
  './GeometryAttribute-43536dc0',
  './WebGLConstants-1c8239cc'
], function (e, t, n, r, a, i, u, x) {
  'use strict'
  var o = p,
    s = p
  function p(e, t, n) {
    n = n || 2
    var r,
      a,
      i,
      u,
      x,
      o,
      s,
      p = t && t.length,
      y = p ? t[0] * n : e.length,
      f = h(e, 0, y, n, !0),
      c = []
    if (!f || f.next === f.prev) return c
    if (
      (p &&
        (f = (function (e, t, n, r) {
          var a,
            i,
            u,
            x = []
          for (a = 0, i = t.length; a < i; a++)
            (u = h(e, t[a] * r, a < i - 1 ? t[a + 1] * r : e.length, r, !1)) === u.next && (u.steiner = !0), x.push(b(u))
          for (x.sort(m), a = 0; a < x.length; a++) n = l((n = C(x[a], n)), n.next)
          return n
        })(e, t, f, n)),
      e.length > 80 * n)
    ) {
      ;(r = i = e[0]), (a = u = e[1])
      for (var d = n; d < y; d += n) (x = e[d]) < r && (r = x), (o = e[d + 1]) < a && (a = o), x > i && (i = x), o > u && (u = o)
      s = 0 !== (s = Math.max(i - r, u - a)) ? 1 / s : 0
    }
    return v(f, c, n, r, a, s), c
  }
  function h(e, t, n, r, a) {
    var i, u
    if (a === W(e, t, n, r) > 0) for (i = t; i < n; i += r) u = G(i, e[i], e[i + 1], u)
    else for (i = n - r; i >= t; i -= r) u = G(i, e[i], e[i + 1], u)
    return u && S(u, u.next) && (O(u), (u = u.next)), u
  }
  function l(e, t) {
    if (!e) return e
    t || (t = e)
    var n,
      r = e
    do {
      if (((n = !1), r.steiner || (!S(r, r.next) && 0 !== Z(r.prev, r, r.next)))) r = r.next
      else {
        if ((O(r), (r = t = r.prev) === r.next)) break
        n = !0
      }
    } while (n || r !== t)
    return t
  }
  function v(e, t, n, r, a, i, u) {
    if (e) {
      !u &&
        i &&
        (function (e, t, n, r) {
          var a = e
          do {
            null === a.z && (a.z = w(a.x, a.y, t, n, r)), (a.prevZ = a.prev), (a.nextZ = a.next), (a = a.next)
          } while (a !== e)
          ;(a.prevZ.nextZ = null),
            (a.prevZ = null),
            (function (e) {
              var t,
                n,
                r,
                a,
                i,
                u,
                x,
                o,
                s = 1
              do {
                for (n = e, e = null, i = null, u = 0; n; ) {
                  for (u++, r = n, x = 0, t = 0; t < s && (x++, (r = r.nextZ)); t++);
                  for (o = s; x > 0 || (o > 0 && r); )
                    0 !== x && (0 === o || !r || n.z <= r.z) ? ((a = n), (n = n.nextZ), x--) : ((a = r), (r = r.nextZ), o--),
                      i ? (i.nextZ = a) : (e = a),
                      (a.prevZ = i),
                      (i = a)
                  n = r
                }
                ;(i.nextZ = null), (s *= 2)
              } while (u > 1)
            })(a)
        })(e, r, a, i)
      for (var x, o, s = e; e.prev !== e.next; )
        if (((x = e.prev), (o = e.next), i ? f(e, r, a, i) : y(e)))
          t.push(x.i / n), t.push(e.i / n), t.push(o.i / n), O(e), (e = o.next), (s = o.next)
        else if ((e = o) === s) {
          u ? (1 === u ? v((e = c(l(e), t, n)), t, n, r, a, i, 2) : 2 === u && d(e, t, n, r, a, i)) : v(l(e), t, n, r, a, i, 1)
          break
        }
    }
  }
  function y(e) {
    var t = e.prev,
      n = e,
      r = e.next
    if (Z(t, n, r) >= 0) return !1
    for (var a = e.next.next; a !== e.prev; ) {
      if (E(t.x, t.y, n.x, n.y, r.x, r.y, a.x, a.y) && Z(a.prev, a, a.next) >= 0) return !1
      a = a.next
    }
    return !0
  }
  function f(e, t, n, r) {
    var a = e.prev,
      i = e,
      u = e.next
    if (Z(a, i, u) >= 0) return !1
    for (
      var x = a.x < i.x ? (a.x < u.x ? a.x : u.x) : i.x < u.x ? i.x : u.x,
        o = a.y < i.y ? (a.y < u.y ? a.y : u.y) : i.y < u.y ? i.y : u.y,
        s = a.x > i.x ? (a.x > u.x ? a.x : u.x) : i.x > u.x ? i.x : u.x,
        p = a.y > i.y ? (a.y > u.y ? a.y : u.y) : i.y > u.y ? i.y : u.y,
        h = w(x, o, t, n, r),
        l = w(s, p, t, n, r),
        v = e.prevZ,
        y = e.nextZ;
      v && v.z >= h && y && y.z <= l;

    ) {
      if (v !== e.prev && v !== e.next && E(a.x, a.y, i.x, i.y, u.x, u.y, v.x, v.y) && Z(v.prev, v, v.next) >= 0) return !1
      if (((v = v.prevZ), y !== e.prev && y !== e.next && E(a.x, a.y, i.x, i.y, u.x, u.y, y.x, y.y) && Z(y.prev, y, y.next) >= 0)) return !1
      y = y.nextZ
    }
    for (; v && v.z >= h; ) {
      if (v !== e.prev && v !== e.next && E(a.x, a.y, i.x, i.y, u.x, u.y, v.x, v.y) && Z(v.prev, v, v.next) >= 0) return !1
      v = v.prevZ
    }
    for (; y && y.z <= l; ) {
      if (y !== e.prev && y !== e.next && E(a.x, a.y, i.x, i.y, u.x, u.y, y.x, y.y) && Z(y.prev, y, y.next) >= 0) return !1
      y = y.nextZ
    }
    return !0
  }
  function c(e, t, n) {
    var r = e
    do {
      var a = r.prev,
        i = r.next.next
      !S(a, i) && A(a, r, r.next, i) && L(a, i) && L(i, a) && (t.push(a.i / n), t.push(r.i / n), t.push(i.i / n), O(r), O(r.next), (r = e = i)),
        (r = r.next)
    } while (r !== e)
    return l(r)
  }
  function d(e, t, n, r, a, i) {
    var u = e
    do {
      for (var x = u.next.next; x !== u.prev; ) {
        if (u.i !== x.i && M(u, x)) {
          var o = D(u, x)
          return (u = l(u, u.next)), (o = l(o, o.next)), v(u, t, n, r, a, i), void v(o, t, n, r, a, i)
        }
        x = x.next
      }
      u = u.next
    } while (u !== e)
  }
  function m(e, t) {
    return e.x - t.x
  }
  function C(e, t) {
    var n = (function (e, t) {
      var n,
        r = t,
        a = e.x,
        i = e.y,
        u = -1 / 0
      do {
        if (i <= r.y && i >= r.next.y && r.next.y !== r.y) {
          var x = r.x + ((i - r.y) * (r.next.x - r.x)) / (r.next.y - r.y)
          if (x <= a && x > u) {
            if (((u = x), x === a)) {
              if (i === r.y) return r
              if (i === r.next.y) return r.next
            }
            n = r.x < r.next.x ? r : r.next
          }
        }
        r = r.next
      } while (r !== t)
      if (!n) return null
      if (a === u) return n
      var o,
        s = n,
        p = n.x,
        h = n.y,
        l = 1 / 0
      r = n
      do {
        a >= r.x &&
          r.x >= p &&
          a !== r.x &&
          E(i < h ? a : u, i, p, h, i < h ? u : a, i, r.x, r.y) &&
          ((o = Math.abs(i - r.y) / (a - r.x)), L(r, e) && (o < l || (o === l && (r.x > n.x || (r.x === n.x && g(n, r))))) && ((n = r), (l = o))),
          (r = r.next)
      } while (r !== s)
      return n
    })(e, t)
    if (!n) return t
    var r = D(n, e),
      a = l(n, n.next)
    return l(r, r.next), t === n ? a : t
  }
  function g(e, t) {
    return Z(e.prev, e, t.prev) < 0 && Z(t.next, e, e.next) < 0
  }
  function w(e, t, n, r, a) {
    return (
      (e =
        1431655765 &
        ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - n) * a) | (e << 8))) | (e << 4))) | (e << 2))) | (e << 1))) |
      ((t =
        1431655765 &
        ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - r) * a) | (t << 8))) | (t << 4))) | (t << 2))) | (t << 1))) <<
        1)
    )
  }
  function b(e) {
    var t = e,
      n = e
    do {
      ;(t.x < n.x || (t.x === n.x && t.y < n.y)) && (n = t), (t = t.next)
    } while (t !== e)
    return n
  }
  function E(e, t, n, r, a, i, u, x) {
    return (a - u) * (t - x) - (e - u) * (i - x) >= 0 && (e - u) * (r - x) - (n - u) * (t - x) >= 0 && (n - u) * (i - x) - (a - u) * (r - x) >= 0
  }
  function M(e, t) {
    return (
      e.next.i !== t.i &&
      e.prev.i !== t.i &&
      !(function (e, t) {
        var n = e
        do {
          if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && A(n, n.next, e, t)) return !0
          n = n.next
        } while (n !== e)
        return !1
      })(e, t) &&
      ((L(e, t) &&
        L(t, e) &&
        (function (e, t) {
          var n = e,
            r = !1,
            a = (e.x + t.x) / 2,
            i = (e.y + t.y) / 2
          do {
            n.y > i != n.next.y > i && n.next.y !== n.y && a < ((n.next.x - n.x) * (i - n.y)) / (n.next.y - n.y) + n.x && (r = !r), (n = n.next)
          } while (n !== e)
          return r
        })(e, t) &&
        (Z(e.prev, e, t.prev) || Z(e, t.prev, t))) ||
        (S(e, t) && Z(e.prev, e, e.next) > 0 && Z(t.prev, t, t.next) > 0))
    )
  }
  function Z(e, t, n) {
    return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y)
  }
  function S(e, t) {
    return e.x === t.x && e.y === t.y
  }
  function A(e, t, n, r) {
    var a = R(Z(e, t, n)),
      i = R(Z(e, t, r)),
      u = R(Z(n, r, e)),
      x = R(Z(n, r, t))
    return (a !== i && u !== x) || !(0 !== a || !z(e, n, t)) || !(0 !== i || !z(e, r, t)) || !(0 !== u || !z(n, e, r)) || !(0 !== x || !z(n, t, r))
  }
  function z(e, t, n) {
    return t.x <= Math.max(e.x, n.x) && t.x >= Math.min(e.x, n.x) && t.y <= Math.max(e.y, n.y) && t.y >= Math.min(e.y, n.y)
  }
  function R(e) {
    return e > 0 ? 1 : e < 0 ? -1 : 0
  }
  function L(e, t) {
    return Z(e.prev, e, e.next) < 0 ? Z(e, t, e.next) >= 0 && Z(e, e.prev, t) >= 0 : Z(e, t, e.prev) < 0 || Z(e, e.next, t) < 0
  }
  function D(e, t) {
    var n = new T(e.i, e.x, e.y),
      r = new T(t.i, t.x, t.y),
      a = e.next,
      i = t.prev
    return (e.next = t), (t.prev = e), (n.next = a), (a.prev = n), (r.next = n), (n.prev = r), (i.next = r), (r.prev = i), r
  }
  function G(e, t, n, r) {
    var a = new T(e, t, n)
    return r ? ((a.next = r.next), (a.prev = r), (r.next.prev = a), (r.next = a)) : ((a.prev = a), (a.next = a)), a
  }
  function O(e) {
    ;(e.next.prev = e.prev), (e.prev.next = e.next), e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ)
  }
  function T(e, t, n) {
    ;(this.i = e),
      (this.x = t),
      (this.y = n),
      (this.prev = null),
      (this.next = null),
      (this.z = null),
      (this.prevZ = null),
      (this.nextZ = null),
      (this.steiner = !1)
  }
  function W(e, t, n, r) {
    for (var a = 0, i = t, u = n - r; i < n; i += r) (a += (e[u] - e[i]) * (e[i + 1] + e[u + 1])), (u = i)
    return a
  }
  ;(p.deviation = function (e, t, n, r) {
    var a = t && t.length,
      i = a ? t[0] * n : e.length,
      u = Math.abs(W(e, 0, i, n))
    if (a)
      for (var x = 0, o = t.length; x < o; x++) {
        var s = t[x] * n,
          p = x < o - 1 ? t[x + 1] * n : e.length
        u -= Math.abs(W(e, s, p, n))
      }
    var h = 0
    for (x = 0; x < r.length; x += 3) {
      var l = r[x] * n,
        v = r[x + 1] * n,
        y = r[x + 2] * n
      h += Math.abs((e[l] - e[y]) * (e[v + 1] - e[l + 1]) - (e[l] - e[v]) * (e[y + 1] - e[l + 1]))
    }
    return 0 === u && 0 === h ? 0 : Math.abs((h - u) / u)
  }),
    (p.flatten = function (e) {
      for (var t = e[0][0].length, n = { vertices: [], holes: [], dimensions: t }, r = 0, a = 0; a < e.length; a++) {
        for (var i = 0; i < e[a].length; i++) for (var u = 0; u < t; u++) n.vertices.push(e[a][i][u])
        a > 0 && ((r += e[a - 1].length), n.holes.push(r))
      }
      return n
    }),
    (o.default = s)
  var P = {
      CLOCKWISE: x.WebGLConstants.CW,
      COUNTER_CLOCKWISE: x.WebGLConstants.CCW,
      validate: function (e) {
        return e === P.CLOCKWISE || e === P.COUNTER_CLOCKWISE
      }
    },
    I = Object.freeze(P),
    B = new t.Cartesian3(),
    N = new t.Cartesian3(),
    U = {
      computeArea2D: function (e) {
        for (var t = e.length, n = 0, r = t - 1, a = 0; a < t; r = a++) {
          var i = e[r],
            u = e[a]
          n += i.x * u.y - u.x * i.y
        }
        return 0.5 * n
      },
      computeWindingOrder2D: function (e) {
        return U.computeArea2D(e) > 0 ? I.COUNTER_CLOCKWISE : I.CLOCKWISE
      },
      triangulate: function (e, n) {
        var r = t.Cartesian2.packArray(e)
        return o(r, n, 2)
      }
    },
    _ = new t.Cartesian3(),
    K = new t.Cartesian3(),
    V = new t.Cartesian3(),
    k = new t.Cartesian3(),
    q = new t.Cartesian3(),
    F = new t.Cartesian3(),
    j = new t.Cartesian3()
  U.computeSubdivision = function (e, n, i, x) {
    x = a.defaultValue(x, r.CesiumMath.RADIANS_PER_DEGREE)
    var o,
      s = i.slice(0),
      p = n.length,
      h = new Array(3 * p),
      l = 0
    for (o = 0; o < p; o++) {
      var v = n[o]
      ;(h[l++] = v.x), (h[l++] = v.y), (h[l++] = v.z)
    }
    for (var y = [], f = {}, c = e.maximumRadius, d = r.CesiumMath.chordLength(x, c), m = d * d; s.length > 0; ) {
      var C,
        g,
        w = s.pop(),
        b = s.pop(),
        E = s.pop(),
        M = t.Cartesian3.fromArray(h, 3 * E, _),
        Z = t.Cartesian3.fromArray(h, 3 * b, K),
        S = t.Cartesian3.fromArray(h, 3 * w, V),
        A = t.Cartesian3.multiplyByScalar(t.Cartesian3.normalize(M, k), c, k),
        z = t.Cartesian3.multiplyByScalar(t.Cartesian3.normalize(Z, q), c, q),
        R = t.Cartesian3.multiplyByScalar(t.Cartesian3.normalize(S, F), c, F),
        L = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(A, z, j)),
        D = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(z, R, j)),
        G = t.Cartesian3.magnitudeSquared(t.Cartesian3.subtract(R, A, j)),
        O = Math.max(L, D, G)
      O > m
        ? L === O
          ? ((o = f[(C = Math.min(E, b) + ' ' + Math.max(E, b))]),
            a.defined(o) ||
              ((g = t.Cartesian3.add(M, Z, j)), t.Cartesian3.multiplyByScalar(g, 0.5, g), h.push(g.x, g.y, g.z), (o = h.length / 3 - 1), (f[C] = o)),
            s.push(E, o, w),
            s.push(o, b, w))
          : D === O
          ? ((o = f[(C = Math.min(b, w) + ' ' + Math.max(b, w))]),
            a.defined(o) ||
              ((g = t.Cartesian3.add(Z, S, j)), t.Cartesian3.multiplyByScalar(g, 0.5, g), h.push(g.x, g.y, g.z), (o = h.length / 3 - 1), (f[C] = o)),
            s.push(b, o, E),
            s.push(o, w, E))
          : G === O &&
            ((o = f[(C = Math.min(w, E) + ' ' + Math.max(w, E))]),
            a.defined(o) ||
              ((g = t.Cartesian3.add(S, M, j)), t.Cartesian3.multiplyByScalar(g, 0.5, g), h.push(g.x, g.y, g.z), (o = h.length / 3 - 1), (f[C] = o)),
            s.push(w, o, b),
            s.push(o, E, b))
        : (y.push(E), y.push(b), y.push(w))
    }
    return new u.Geometry({
      attributes: { position: new u.GeometryAttribute({ componentDatatype: r.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: h }) },
      indices: y,
      primitiveType: u.PrimitiveType.TRIANGLES
    })
  }
  var H = new t.Cartographic(),
    J = new t.Cartographic(),
    Q = new t.Cartographic(),
    X = new t.Cartographic()
  ;(U.computeRhumbLineSubdivision = function (e, n, x, o) {
    o = a.defaultValue(o, r.CesiumMath.RADIANS_PER_DEGREE)
    var s,
      p = x.slice(0),
      h = n.length,
      l = new Array(3 * h),
      v = 0
    for (s = 0; s < h; s++) {
      var y = n[s]
      ;(l[v++] = y.x), (l[v++] = y.y), (l[v++] = y.z)
    }
    for (
      var f = [],
        c = {},
        d = e.maximumRadius,
        m = r.CesiumMath.chordLength(o, d),
        C = new i.EllipsoidRhumbLine(void 0, void 0, e),
        g = new i.EllipsoidRhumbLine(void 0, void 0, e),
        w = new i.EllipsoidRhumbLine(void 0, void 0, e);
      p.length > 0;

    ) {
      var b = p.pop(),
        E = p.pop(),
        M = p.pop(),
        Z = t.Cartesian3.fromArray(l, 3 * M, _),
        S = t.Cartesian3.fromArray(l, 3 * E, K),
        A = t.Cartesian3.fromArray(l, 3 * b, V),
        z = e.cartesianToCartographic(Z, H),
        R = e.cartesianToCartographic(S, J),
        L = e.cartesianToCartographic(A, Q)
      C.setEndPoints(z, R)
      var D = C.surfaceDistance
      g.setEndPoints(R, L)
      var G = g.surfaceDistance
      w.setEndPoints(L, z)
      var O,
        T,
        W,
        P,
        I = w.surfaceDistance,
        B = Math.max(D, G, I)
      B > m
        ? D === B
          ? ((s = c[(O = Math.min(M, E) + ' ' + Math.max(M, E))]),
            a.defined(s) ||
              ((T = C.interpolateUsingFraction(0.5, X)),
              (W = 0.5 * (z.height + R.height)),
              (P = t.Cartesian3.fromRadians(T.longitude, T.latitude, W, e, j)),
              l.push(P.x, P.y, P.z),
              (s = l.length / 3 - 1),
              (c[O] = s)),
            p.push(M, s, b),
            p.push(s, E, b))
          : G === B
          ? ((s = c[(O = Math.min(E, b) + ' ' + Math.max(E, b))]),
            a.defined(s) ||
              ((T = g.interpolateUsingFraction(0.5, X)),
              (W = 0.5 * (R.height + L.height)),
              (P = t.Cartesian3.fromRadians(T.longitude, T.latitude, W, e, j)),
              l.push(P.x, P.y, P.z),
              (s = l.length / 3 - 1),
              (c[O] = s)),
            p.push(E, s, M),
            p.push(s, b, M))
          : I === B &&
            ((s = c[(O = Math.min(b, M) + ' ' + Math.max(b, M))]),
            a.defined(s) ||
              ((T = w.interpolateUsingFraction(0.5, X)),
              (W = 0.5 * (L.height + z.height)),
              (P = t.Cartesian3.fromRadians(T.longitude, T.latitude, W, e, j)),
              l.push(P.x, P.y, P.z),
              (s = l.length / 3 - 1),
              (c[O] = s)),
            p.push(b, s, E),
            p.push(s, M, E))
        : (f.push(M), f.push(E), f.push(b))
    }
    return new u.Geometry({
      attributes: { position: new u.GeometryAttribute({ componentDatatype: r.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: l }) },
      indices: f,
      primitiveType: u.PrimitiveType.TRIANGLES
    })
  }),
    (U.scaleToGeodeticHeight = function (e, n, r, i) {
      r = a.defaultValue(r, t.Ellipsoid.WGS84)
      var u = B,
        x = N
      if (((n = a.defaultValue(n, 0)), (i = a.defaultValue(i, !0)), a.defined(e)))
        for (var o = e.length, s = 0; s < o; s += 3)
          t.Cartesian3.fromArray(e, s, x),
            i && (x = r.scaleToGeodeticSurface(x, x)),
            0 !== n && ((u = r.geodeticSurfaceNormal(x, u)), t.Cartesian3.multiplyByScalar(u, n, u), t.Cartesian3.add(x, u, x)),
            (e[s] = x.x),
            (e[s + 1] = x.y),
            (e[s + 2] = x.z)
      return e
    }),
    (e.PolygonPipeline = U),
    (e.WindingOrder = I)
})
