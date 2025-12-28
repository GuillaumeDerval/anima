/**
 * Utilitaires pour Anima Beyond Fantasy
 * Fonctions communes utilisées par plusieurs pages
 */

/**
 * Effectue un jet de dé ouvert (d100) avec gestion des fumbles et des jets étendus
 * @param {boolean} isMaster - Si true, le fumble est sur 1-2, sinon sur 1-3
 * @returns {Object} - { total: number, details: number[], isFumble: boolean, isExtended: boolean }
 */
function rollOpenD100(isMaster = false) {
    const fumbleThreshold = isMaster ? 2 : 3;

    let total = 0;
    let roll = 0;
    let details = [];
    let isFumble = false;
    let fumbleRoll = 0;

    while (true) {
        roll = Math.floor(Math.random() * 100) + 1;
        details.push(roll);
        total += roll;

        if (details.length === 1 && roll <= fumbleThreshold) {
            // Fumble!
            isFumble = true;
            fumbleRoll = Math.floor(Math.random() * 100) + 1;
            roll = -fumbleRoll;
            details.push(roll);
            total += roll;
            break;
        }
        if (roll < 90 + details.length - 1) {
            break;
        }
    }

    return {
        total: total,
        details: details,
        isFumble: isFumble,
        isExtended: details.length > 1,
        fumbleRoll: fumbleRoll
    };
}

/**
 * Affiche un message pour un jet étendu
 * @param {Object} rollResult - Résultat de rollOpenD100
 */
function showExtendedRollMessage(rollResult) {
    if (rollResult.isExtended) {
        const detailStr = rollResult.details.join(', ');
        const fumbleStr = rollResult.isFumble ? ` (Fumble! Roll: ${rollResult.fumbleRoll})` : '';
        alert(`Jet étendu !${fumbleStr} Détails: [${detailStr}] = ${rollResult.total}`);
    }
}
