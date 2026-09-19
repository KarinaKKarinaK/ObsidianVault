## Code

breed [freshers fresher]  
breed [seniors senior]  
  
turtles-own [ interestingness just-interacted? opinion ]  
  
globals [ number-of-interactions ]  
  
to setup  
  clear-all   
  reset-ticks  
  
  set-default-shape freshers "circle"  
  set-default-shape seniors "square"  
    
  let n-freshers floor (n / 2)  
  let n-seniors n - n-freshers  
  
  create-freshers n-freshers [  
    set color blue  
    set size 1  
    setxy random-xcor random-ycor  
    set interestingness random-float 1  
    set opinion random-float 1  
    set just-interacted? false  
  ]  
  
  create-seniors n-seniors [  
    set color blue  
    set size 1  
    setxy random-xcor random-ycor  
    set interestingness random-float 1  
    set opinion random-float 1  
    set just-interacted? false  
  ]  
    
  set number-of-interactions 0   
end  
  
to go  
  set number-of-interactions 0   
  ask turtles [  
    let nearby other turtles in-radius 1  
    ifelse any? nearby [  
      let max-i max [  
        ifelse-value (breed = [breed] of myself)  
        [ interestingness * homophily ]  
        [ interestingness * (1 - homophily) ]  
      ] of nearby     
        
      let partner one-of nearby  
      ifelse random-float 1 < max-i [  
        interact-with partner  
      ][   
        move   
       repulse-from partner  
      ]  
    ][ move ]  
  ]  
  ask turtles [ set just-interacted? false ]  
  tick  
end  
  
to interact-with [other-turtle]  
  set color orange  
  ask other-turtle [   
    set color orange   
    set just-interacted? true  
  ]  
  set number-of-interactions number-of-interactions + 1  
    
  attract-to other-turtle  
    
end  
  
to attract-to [other-turtle]  
  let mu 0.15  
  
  let other-turtle-opinion [opinion] of other-turtle  
  let this-turtle-opinion opinion  
    
  set opinion opinion + mu * (other-turtle-opinion - opinion)  
  set opinion max list 0 (min list 1 opinion)  
    
  ask other-turtle [  
    set opinion opinion + mu * (this-turtle-opinion - opinion)  
    set opinion max list 0 (min list 1 opinion)  
  ]   
end  
  
to repulse-from [other-turtle]  
  let mu 0.15  
    
  let other-turtle-opinion [opinion] of other-turtle  
  let this-turtle-opinion opinion  
    
  set opinion opinion - mu * (other-turtle-opinion - opinion)  
  set opinion max list 0 (min list 1 opinion)  
    
  ask other-turtle [  
    set opinion opinion - mu * (this-turtle-opinion - opinion)  
    set opinion max list 0 (min list 1 opinion)  
  ]   
end  
  
to move  
  if not just-interacted? [  
    forward 1  
    rt random 10  
    lt random 10  
    set color blue  
  ]  
end  
  
to-report mean-opinion-freshers  
  ifelse any? freshers  
  [ report mean [opinion] of freshers ]  
  [ report 0 ]  
end  
  
to-report mean-opinion-seniors  
  ifelse any? seniors  
  [ report mean [opinion] of seniors ]  
  [ report 0 ]  
end