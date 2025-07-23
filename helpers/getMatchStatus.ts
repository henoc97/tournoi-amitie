export function getMatchStatus(match: { date: string; heure: string; termine: boolean }) {
    if (match.termine) return "Terminé";

    const matchDateTime = new Date(`${match.date}T${match.heure}`);
    const now = new Date();

    if (now >= matchDateTime) {
        return "En cours";
    } else {
        return "À venir";
    }
}
