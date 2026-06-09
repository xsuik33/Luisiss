function erf(x) {
    let a1 = 0.254829592,
        a2 = -0.284496736,
        a3 = 1.421413741,
        a4 = -1.453152027,
        a5 = 1.061405429,
        p = 0.3275911;
    let sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    let t = 1.0 / (1.0 + p * x);
    let y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
}

function actualizar() {
    let a = document.getElementById("a").value;
    let b = document.getElementById("b").value;
    let mu = document.getElementById("mu").value;
    let v = document.getElementById("v").value;

    // 1. Actualizar la fórmula visualmente
    let formula = document.getElementById("formula");
    formula.innerHTML = `$$\\int_{${a}}^{${b}} \\frac{1}{${v}\\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-${mu}}{${v}}\\right)^2} dx$$`;
    MathJax.typesetPromise([formula]);

    // 2. Cálculo
    let valA = parseFloat(a),
        valB = parseFloat(b),
        valMu = parseFloat(mu),
        valV = parseFloat(v);

    if (valV > 0) {
        let res =
            0.5 * (1 + erf((valB - valMu) / (valV * Math.sqrt(2)))) -
            0.5 * (1 + erf((valA - valMu) / (valV * Math.sqrt(2))));

        // Conversión a porcentaje
        let porcentaje = (res * 100).toFixed(2) + "%";

        // Conversión a fracción simple (usando una aproximación útil)
        // Buscamos un denominador común (ejemplo: 10000)
        let num = Math.round(res * 10000);
        let frac = num + "/10000";

        // 3. Mostrar en el HTML
        document.getElementById("valor-final").innerHTML =
            `<strong>${porcentaje}</strong><br><small class="text-muted">Equivalente a: ${frac}</small>`;
    }
}
