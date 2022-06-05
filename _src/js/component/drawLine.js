const LeaderLine = window.LeaderLine;

let leadercnf = {
  size: 1,
  dash: {len: 4, gap: 4},
  path: 'grid',
  startSocket: 'bottom',
  endSocket: 'top',
  endPlug: 'behind',
  color: '#50220F',
}

new LeaderLine(
  document.getElementById('step-1'),
  LeaderLine.pointAnchor(
    document.getElementById('step-2'), { x: '20%', y: 0 }
  ),leadercnf);
