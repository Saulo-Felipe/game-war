import { useEffect } from "react"
import { game } from "../../App"
import HalloweenMap from "../../scenes/HalloweenMap"


export default function PlayGame() {

  useEffect(() => {
    game.scene.add('Game-Halloween', HalloweenMap)
    game.scene.start("Game-Halloween", {
      character: "steve",
      dispatch: "dispatch",
    })
  
  }, [])

  return <></>
}