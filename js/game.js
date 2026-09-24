export function recommendedWords(activeClueGivers,turns=1){
  return Math.max(4,activeClueGivers*12);
}
export function eligibleCards(state,teamIndex,blockedAuthorIds=[]){
  const round=state.round;
  return state.roundPool.filter(card=>(state.guesses[round]?.[card.id]||[]).length===0 && !blockedAuthorIds.includes(card.authorId));
}
export function pickCard(state,teamIndex,excluded=[],blockedAuthorIds=[]){
  const cards=eligibleCards(state,teamIndex,blockedAuthorIds).filter(c=>!excluded.includes(c.id));
  if(!cards.length) return null;
  return cards[Math.floor(Math.random()*cards.length)];
}
export function markGuess(state,cardId,teamIndex){
  const r=state.round;state.guesses[r]??={};state.guesses[r][cardId]??=[];
  if(state.guesses[r][cardId].length===0){
    state.guesses[r][cardId].push(teamIndex);
    state.teams[teamIndex].score++;
    state.teams[teamIndex].roundScore++;
    return true;
  }
  return false;
}
export function uniqueGuessed(state){
  const g=state.guesses[state.round]||{};
  return state.roundPool.filter(c=>(g[c.id]||[]).length>0);
}
export function allCardsExhausted(state){
  return state.roundPool.every(c=>(state.guesses[state.round]?.[c.id]||[]).length>0);
}
