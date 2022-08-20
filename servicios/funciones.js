export function addItem(item) {
  item++;

  return item;
}
export function removeItem(item) {
  if (item > 0) {
    item--;
    return item;
  } else {
    return item;
  }
}

export function getCombatientes(combatiente) {
  const atacanteNaves = [];
  const defensorNaves = [];
  for (var i = 0; i < localStorage.length; i++) {
    if (
      localStorage.getItem(localStorage.key(i)).substring(0, 25) ===
      '{"dados":[{"dadosNumero":'
    ) {
      const nave = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (nave.jugador === "atacante") {
        atacanteNaves.push(nave);
      } else {
        defensorNaves.push(nave);
      }
    }
  }
  if (combatiente === "atacante") {
    return atacanteNaves;
  } else {
    return defensorNaves;
  }
}

export function getOrdenIniciativa(atacante, defensor) {
  let iniciativaList = [];
  iniciativaList = atacante.concat(defensor);

  iniciativaList = iniciativaList.sort(function (a, b) {
    if (parseFloat(a.iniciativa) === parseFloat(b.iniciativa)) {
      return a.jugador > b.jugador ? -1 : 1;
    }
    return -parseFloat(a.iniciativa) + parseFloat(b.iniciativa);
  });

  return iniciativaList;
}

export function potenciaAtaque() {
  return Math.floor(Math.random() * (6 - 1 + 1) + 1);
}
